import { loginState } from "@/state";
import { LineType } from "@/types";
import { throttle } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  Arrow,
  Circle,
  Group,
  Line as KonvaLine,
  Layer,
  Rect,
  Stage,
  Text,
} from "react-konva";
import { useRecoilValue } from "recoil";
import socket from "../services/socket";
import { useStore } from "../store/useStore";

interface CanvasProps {
  tool: string;
  color: string;
}

interface CursorData {
  id: string;
  x: number;
  y: number;
  username: string;
}

const Canvas: React.FC<CanvasProps> = ({ tool, color }) => {
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);
  const { lines, addLine, setLines } = useStore();
  const [shapeInProgress, setShapeInProgress] = useState<LineType | null>(null);
  const [cursors, setCursors] = useState<Record<string, CursorData>>({});
  const userId = useRef<string>(Math.random().toString(36).substring(2, 10));
  const auth = useRecoilValue(loginState);
  const username = auth.userData?.email || `User-${userId.current.slice(-4)}`;

  useEffect(() => {
    socket.on("draw", (data: LineType) => {
      addLine(data);
    });

    socket.on("cursor", (data: CursorData) => {
      setCursors((prev) => {
        // ensure only the latest cursor per username
        const filtered = Object.fromEntries(
          Object.entries(prev).filter(([_, v]) => v.username !== data.username),
        );
        return { ...filtered, [data.id]: data };
      });
    });
  }, [addLine]);

  const throttledCursorEmit = useRef(
    throttle(
      (point: { x: number; y: number }) => {
        socket.emit("cursor", {
          id: userId.current,
          x: point.x,
          y: point.y,
          username,
        });
      },
      50,
      { leading: true, trailing: true },
    ),
  ).current;

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    if (tool === "pen" || tool === "eraser") {
      const newLine: LineType = {
        tool,
        points: [pos.x, pos.y],
        color,
      };
      addLine(newLine);
      socket.emit("draw", newLine);
    } else {
      const newShape: LineType = {
        tool,
        points: [pos.x, pos.y, pos.x, pos.y],
        color,
      };
      setShapeInProgress(newShape);
    }
  };

  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    throttledCursorEmit(point);

    if (!isDrawing.current) return;

    if (tool === "pen" || tool === "eraser") {
      const lastLine = lines[lines.length - 1];
      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, point.x, point.y],
      };
      const newLines = [...lines.slice(0, -1), updatedLine];
      setLines(newLines);
      socket.emit("draw", updatedLine);
    } else if (shapeInProgress) {
      const start = shapeInProgress.points.slice(0, 2);
      const updatedShape = {
        ...shapeInProgress,
        points: [...start, point.x, point.y],
      };
      setShapeInProgress(updatedShape);
    }
  };

  const handleMouseUp = () => {
    if (shapeInProgress) {
      addLine(shapeInProgress);
      socket.emit("draw", shapeInProgress);
      setShapeInProgress(null);
    }
    isDrawing.current = false;
  };

  const renderShape = (line: LineType, i: number) => {
    const [x1, y1, x2, y2] = line.points;
    switch (line.tool) {
      case "rectangle":
        return (
          <Rect
            key={i}
            x={Math.min(x1, x2)}
            y={Math.min(y1, y2)}
            width={Math.abs(x2 - x1)}
            height={Math.abs(y2 - y1)}
            stroke={line.color}
            strokeWidth={2}
          />
        );
      case "circle":
        const radius = Math.hypot(x2 - x1, y2 - y1) / 2;
        return (
          <Circle
            key={i}
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2}
            radius={radius}
            stroke={line.color}
            strokeWidth={2}
          />
        );
      case "arrow":
        return (
          <Arrow
            key={i}
            points={line.points}
            stroke={line.color}
            strokeWidth={2}
          />
        );
      case "pen":
      case "eraser":
      default:
        return (
          <KonvaLine
            key={i}
            points={line.points}
            stroke={line.tool === "eraser" ? "#fff" : line.color}
            strokeWidth={line.tool === "eraser" ? 10 : 2}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation={
              line.tool === "eraser" ? "destination-out" : "source-over"
            }
          />
        );
    }
  };

  const renderCursors = () => {
    return Object.values(cursors).map((cursor) => (
      <Group key={cursor.username}>
        <Circle x={cursor.x} y={cursor.y} radius={4} fill="blue" />
        <Text
          x={cursor.x + 6}
          y={cursor.y - 10}
          text={cursor.username}
          fontSize={12}
          fill="black"
        />
      </Group>
    ));
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      ref={stageRef}
    >
      <Layer>
        {lines.map((line, i) => renderShape(line, i))}
        {shapeInProgress && renderShape(shapeInProgress, lines.length)}
        {renderCursors()}
      </Layer>
    </Stage>
  );
};

export default Canvas;
