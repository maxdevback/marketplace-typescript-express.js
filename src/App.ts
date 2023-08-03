import express from "express";
import { connect } from "mongoose";
import { envVars } from "./dotenv";
import routes from "./routes/index";

export const App = express();
App.use(express.json());

App.use(routes);

App.listen(3000, async () => {
  await connect(envVars.mongoDBLink);
  console.log("The server has been started at 3000 port");
});
