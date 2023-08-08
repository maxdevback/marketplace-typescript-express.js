import Router from "express";
import GoodsController from "../../controllers/goods";
const router = Router();

router.get("/", GoodsController.getAll);
router.get("/my", GoodsController.getAllByAuth);
router.get("/seller/:sellerId", GoodsController.getAllBySellerId);
router.get("/:goodId", GoodsController.getById);
router.post("/", GoodsController.create);
router.patch("/:goodId", GoodsController.patch);
router.delete("/:goodId", GoodsController.delete);

export default router;
