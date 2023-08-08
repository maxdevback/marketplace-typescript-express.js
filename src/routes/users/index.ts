import { Router } from "express";
import UsersController from "../../controllers/users";

const router = Router();

router.get("/", UsersController.getAll);
router.get("/:userId", UsersController.getById);
router.post("/", UsersController.create);
router.post("/auth/login", UsersController.login);
router.post("/auth/register", UsersController.register);
router.patch("/:userId", UsersController.patch);
router.delete("/:userId", UsersController.delete);

export default router;
