import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import convertHoursStringToMinutes from "./utils/convertHoursStringToMinutes";
import convertMinutesToHoursString from "./utils/convertMinutesToHoursString";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/games", async (request: Request, response: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.status(200).json(games);
});

app.get("/games/:id/ads", async (request: Request, response: Response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
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

  return response.status(200).json(addsFormated);
});

app.post("/games/:id/ads", async (request: Request, response: Response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays,
      hourStart: convertHoursStringToMinutes(body.hourStart),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get("/ads/:id/discord", async (request: Request, response: Response) => {
  const adId = request.params.id;

  const discord = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.status(200).json(discord);
});

app.listen(3333, () => {
  console.log("Server is running in port 3333!");
});
