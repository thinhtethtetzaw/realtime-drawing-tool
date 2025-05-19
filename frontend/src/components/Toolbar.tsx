// src/components/Toolbar.tsx
import React from "react";

interface Props {
  tool: string;
  setTool: (tool: string) => void;
  color: string;
  setColor: (color: string) => void;
}

const Toolbar: React.FC<Props> = ({ tool, setTool, color, setColor }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <select value={tool} onChange={(e) => setTool(e.target.value)}>
        <option value="pen">Pen</option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="arrow">Arrow</option>
        <option value="eraser">Eraser</option>
      </select>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

export default Toolbar;
