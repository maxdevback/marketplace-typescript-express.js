import { Router } from "express";

import usersRouter from "./users";
import goodsRouter from "./goods";
import invalidRouter from "./invalid";

const router = Router();

router.use("/users", usersRouter);
router.use("/goods", goodsRouter);
router.use("*", invalidRouter);

export default router;
