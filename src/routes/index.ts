import { Router } from "express";

import usersRouter from "./users";
import goodsRouter from "./goods";
// import ordersRouter from "./orders";
// import reviewsRouter from "./reviews";
import invalidRouter from "./invalid";

const router = Router();

router.use("/users", usersRouter);
router.use("/goods", goodsRouter);
// router.use("/orders", ordersRouter);
// router.use("/reviews", reviewsRouter);
router.use("*", invalidRouter);

export default router;
