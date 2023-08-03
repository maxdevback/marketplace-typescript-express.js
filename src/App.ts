import express from "express";

const App = express();

App.get("*", (req, res) => {
  res.send("Hello world");
});

App.listen(3000, () => {
  console.log("The application has been started at 3000 port");
});
