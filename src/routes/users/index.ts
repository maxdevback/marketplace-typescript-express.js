import { Router } from "express";
import UsersController from "../../controllers/users";
import { upload } from "../../models/multer/multer";

const router = Router();

router.get("/", UsersController.getAll); // +
router.get("/:userId", UsersController.getById); // +
router.post("/auth/login", UsersController.login); // +-
router.post("/auth/register", UsersController.register); // +
router.patch("/", upload.any(), UsersController.patch); // +
router.delete("/", UsersController.logout);
router.delete("/", UsersController.delete);

export default router;
