import express from "express";
import "express-async-errors";

import cors from "cors";

import { errors } from "celebrate";
import { routes } from "./module/router/index.routes";
import ErrorHandler from "./config/error/ErrorHandler";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(routes);
app.use(errors());

app.use(ErrorHandler.handler);

// This middleware adds the json header to every response
app.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

app.listen(3333, () => {
  console.log("Server is running in port 3333!");
});
