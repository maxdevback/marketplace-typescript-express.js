import Router from "express";
import GoodsController from "../../controllers/goods";
const router = Router();

router.get("/", GoodsController.getAllByAuth);
router.get("/:id", GoodsController.getById);
router.post("/", GoodsController.create);
router.patch("/:id", GoodsController.patch);
router.delete("/:id", GoodsController.delete);

export default router;
