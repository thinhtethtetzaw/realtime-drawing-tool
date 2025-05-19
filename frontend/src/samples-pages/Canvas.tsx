import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import { useState } from "react";
const CanvasPage = () => {
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  return (
    <>
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
      />
      <Canvas tool={tool} color={color} />
    </>
  );
};

export default CanvasPage;
