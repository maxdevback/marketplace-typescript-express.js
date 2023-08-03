import { Router } from "express";

const router = Router();

router.all("*", (req, res) => {
  res.status(404);
  res.send("Page not found");
});

export default router;
