import React, { Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import CircularProgressPage from "../components/CircularProgressPage";
import routes from "./authenticatedRoutes"; // route list

const ProtectedRoutes = (): JSX.Element => (
  <Routes>
      {routes.map(({ component: Component, path }) => (
        <Route path={`/${path}`} key={path} element={<Component />} />
      ))}
      {/* <Outlet/> */}
  </Routes>
);

export default ProtectedRoutes;

//i we don't want to include path : "/" then use <Outlet/>
//https://reactrouter.com/en/main/components/outlet