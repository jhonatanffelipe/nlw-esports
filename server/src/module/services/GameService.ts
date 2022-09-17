import { PrismaClient, Game, Ad } from "@prisma/client";
import convertHoursStringToMinutes from "../../utils/convertHoursStringToMinutes";
import convertMinutesToHoursString from "../../utils/convertMinutesToHoursString";

interface IAd {
  hourStart: String;
  hourEnd: String;
  weekDays: string[];
  id: string;
  name: string;
  useVoiceChannel: boolean;
  yearsPlaying: number;
}

interface ICreateAd {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface IDiscord {
  discord: string;
}

export default class GameService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async listGame(): Promise<Game[]> {
    const games = await this.prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
    return games;
  }

  public async listAds(gameId: string): Promise<IAd[]> {
    const ads = await this.prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const addsFormated = ads.map((ad) => {
      return {
        ...ad,
        hourStart: convertMinutesToHoursString(ad.hourStart),
        hourEnd: convertMinutesToHoursString(ad.hourEnd),
        weekDays: ad.weekDays.split(","),
      };
    });

    return addsFormated;
  }

  public async createAd({
    discord,
    gameId,
    hourEnd,
    hourStart,
    name,
    useVoiceChannel,
    weekDays,
    yearsPlaying,
  }: ICreateAd): Promise<Ad> {
    const ad = await this.prisma.ad.create({
      data: {
        gameId,
        name,
        yearsPlaying,
        discord,
        weekDays,
        hourStart: convertHoursStringToMinutes(hourStart),
        hourEnd: convertHoursStringToMinutes(hourEnd),
        useVoiceChannel: useVoiceChannel,
      },
    });

    return ad;
  }

  public async getDiscord(adId: string): Promise<IDiscord> {
    const discord = await this.prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });
    return discord;
  }
}
