import { Router } from "express";
import UsersController from "../../controllers/users";

const router = Router();

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);
router.patch("/");
router.delete("/:id", UsersController.delete);

export default router;
