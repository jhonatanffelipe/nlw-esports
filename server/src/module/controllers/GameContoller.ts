import { Request, Response } from "express";

import GameService from "../services/GameService";

export default class GameController {
  public async listGame(
    request: Request,
    response: Response
  ): Promise<Response> {
    const service = new GameService();
    const games = await service.listGame();
    return response.json(games);
  }

  async listAds(request: Request, response: Response): Promise<Response> {
    const service = new GameService();
    const gameId = request.params.id;
    const ads = await service.listAds(gameId);
    return response.json(ads);
  }

  async createAd(request: Request, response: Response): Promise<Response> {
    const gameId = request.params.id;

    const service = new GameService();
    const {
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel,
    } = request.body;

    const ad = await service.createAd({
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel,
    });

    return response.json(ad);
  }

  async getDiscord(request: Request, response: Response): Promise<Response> {
    const service = new GameService();
    const adId = request.params.id;
    const discord = await service.getDiscord(adId);
    return response.json(discord);
  }
}
