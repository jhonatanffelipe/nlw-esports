import { Router } from "express";

import AdsValidation from "../../middlewares/celebrate/ads.validation";
import GameController from "../controllers/GameContoller";

const gameRoutes = Router();
const controller = new GameController();
const adsValidation = new AdsValidation();

gameRoutes.get("/", controller.listGame);

gameRoutes.get("/:id/ads", controller.listAds);

gameRoutes.post("/:id/ads", adsValidation.validadeBody, controller.createAd);

gameRoutes.get("/ads/:id/discord", controller.getDiscord);

export default gameRoutes;
