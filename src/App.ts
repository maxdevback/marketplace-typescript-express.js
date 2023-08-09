import express from "express";
import path from "path";
import { connect } from "mongoose";
import { envVars } from "./dotenv";

import middlewares from "./middlewares";
import routes from "./routes/index";
import cookieParser from "cookie-parser";

export const App = express();
App.use(express.json());
App.use(cookieParser());
App.use(
  "/images",
  express.static(path.resolve(__dirname, "models", "multer", "images"))
);

App.use(middlewares);
App.use(routes);
export const server = App.listen(envVars.port, async () => {
  await connect(envVars.mongoDBLink);
  console.log(`The server has been started at ${envVars.port} port`);
});
