import { Router } from "express";

import usersRouter from "./users";
import invalidRouter from "./invalid";

const router = Router();

router.use("/users", usersRouter);
router.use("*", invalidRouter);

export default router;
