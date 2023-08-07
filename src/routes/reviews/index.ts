import { Router } from "express";
import ReviewsController from "../../controllers/reviews";

const router = Router();

router.get("/reviewId", ReviewsController.getById);
router.get("/order/:orderId", ReviewsController.getByOrderId);
router.get("/buyer/:buyerId", ReviewsController.getAllByBuyerId);
router.get("/seller/:sellerId", ReviewsController.getAllBySellerId);
router.get("/good/:goodId", ReviewsController.getAllByGoodId);
router.post("/", ReviewsController.create);
router.patch("/:reviewId", ReviewsController.patch);
router.delete("/", ReviewsController.delete);

export default router;
