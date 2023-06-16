import { lazy } from "react";

const routes = [
  {
    path: "",
    component: lazy(() => import("../pages/Home")),
  },
  {
    path: "dashboard",
    component: lazy(() => import("../pages/Dashboard")),
  },
];

export default routes;
