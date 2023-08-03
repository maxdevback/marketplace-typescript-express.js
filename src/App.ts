import express from "express";
import { connect } from "mongoose";
import "./dotenv";
import { envVars } from "./dotenv";

const App = express();

App.get("*", (req, res) => {
  res.send("Hello world");
});

(async () => {
  await connect(envVars.mongoDBLink);
  App.listen(3000, () => {
    console.log("The server has been started at 3000 port");
  });
})();
