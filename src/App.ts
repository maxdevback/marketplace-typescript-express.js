import express from "express";
import { connect } from "mongoose";
import { envVars } from "./dotenv";
import Logger from "./models/logger";

import middlewares from "./middlewares";
import routes from "./routes/index";

export const App = express();
App.use(express.json());

App.use(middlewares);
App.use(routes);
export const server = App.listen(envVars.port, async () => {
  await connect(envVars.mongoDBLink);
  console.log(`The server has been started at ${envVars.port} port`);
});
