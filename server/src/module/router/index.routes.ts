import { Router } from "express";
import gameRoutes from "./game.routes";

const routes = Router();

routes.use("/games", gameRoutes);

export { routes };
