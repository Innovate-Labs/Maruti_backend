import express from "express";
import authRoute from "./auth.route";


const router = express.Router();

interface RouteItem {
  path: string;
  route: express.Router;
}

const defaultRoutes: RouteItem[] = [
  { path: "/auth", route: authRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
