import { Router } from "express";
import ReviewsController from "../../controllers/reviews";

const router = Router();

router.get("/:reviewId", ReviewsController.getById); // +
router.get("/buyer/:buyerId", ReviewsController.getAllByBuyerId); // +
router.get("/seller/:sellerId", ReviewsController.getAllBySellerId); // +
router.get("/good/:goodId", ReviewsController.getAllByGoodId); // +
router.post("/:orderId", ReviewsController.create); // +
router.patch("/:reviewId", ReviewsController.patch); // +
router.delete("/:reviewId", ReviewsController.delete); // +

export default router;
