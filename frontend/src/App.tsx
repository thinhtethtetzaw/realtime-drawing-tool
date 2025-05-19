import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./ecosystem/router";

export default function App() {
  const queryClient = new QueryClient();
  // const [tool, setTool] = useState("pen");
  // const [color, setColor] = useState("#000000");

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
          {/* <>
            <Toolbar
              tool={tool}
              setTool={setTool}
              color={color}
              setColor={setColor}
            />
            <Canvas tool={tool} color={color} />
          </> */}
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
