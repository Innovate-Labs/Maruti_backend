import express from "express";
import authRoute from "./auth.route";
import plantRoute from "./plant.route";
import shopRoute from "./shop.route"
import lineRoute from "./line.route"
import supervisorRoute from "./supervisor.route"

const router = express.Router();

interface RouteItem {
  path: string;
  route: express.Router;
}

const defaultRoutes: RouteItem[] = [
  { path: "/auth", route: authRoute },
  {path: "/plant", route: plantRoute},
  {path: "/shop", route: shopRoute},
  {path: "/line", route: lineRoute},
  {path: "/supervisor",route: supervisorRoute}
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
