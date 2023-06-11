import { lazy } from "react";

const routes = [
  {
    path: "",
    component: lazy(() => import("../pages/Home")),
  },
  {
    path: "products",
    component: lazy(() => import("../pages/ProductPage")),
  },
];

export default routes;
