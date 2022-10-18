import { Request, Response } from "express";

import GameService from "../services/GameService";

export default class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  public listGame = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const games = await this.gameService.listGame();
    return response.json(games);
  };

  public listAds = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const gameId = request.params.id;
    const ads = await this.gameService.listAds(gameId);
    return response.json(ads);
  };

  public createAd = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const gameId = request.params.id;

    const {
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel,
    } = request.body;

    const ad = await this.gameService.createAd({
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
  };

  public getDiscord = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const adId = request.params.id;
    const discord = await this.gameService.getDiscord(adId);
    return response.json(discord);
  };
}
