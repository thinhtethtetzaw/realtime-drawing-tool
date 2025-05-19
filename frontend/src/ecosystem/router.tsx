import Loadable from "@/components/common/Loadable";
import { PageEndPoint } from "@/ecosystem/PageEndPoint";
import { loginState } from "@/state";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";

const HomeHOC = Loadable(lazy(() => import("../samples-pages/Home")));
const LoginHOC = Loadable(lazy(() => import("../samples-pages/Login")));
const CanvasHOC = Loadable(lazy(() => import("../samples-pages/Canvas")));

const publicRoutes = [{ path: PageEndPoint.login, component: LoginHOC }];
const privateRoutes = [
  { path: PageEndPoint.home, component: HomeHOC },
  { path: PageEndPoint.canvas, component: CanvasHOC },
];

const Router = () => {
  const { token } = useRecoilValue(loginState);

  return (
    <Routes>
      {token
        ? privateRoutes.map(({ path, component: Component }) => (
            <Route key={path.url} path={path.url} element={<Component />} />
          ))
        : publicRoutes.map(({ path, component: Component }) => (
            <Route key={path.url} path={path.url} element={<Component />} />
          ))}
      <Route
        path="/*"
        element={
          <Navigate
            to={token ? PageEndPoint.home.url : PageEndPoint.login.url}
            replace
          />
        }
      />
    </Routes>
  );
};

export default Router;
