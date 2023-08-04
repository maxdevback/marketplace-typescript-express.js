import { Router } from "express";
import UsersController from "../../controllers/users";

const router = Router();

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);
router.post("/auth/login", UsersController.login);
router.post("/auth/register", UsersController.register);
router.patch("/:id", UsersController.patch);
router.delete("/:id", UsersController.delete);

export default router;
