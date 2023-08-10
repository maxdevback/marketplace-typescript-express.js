import { Router } from "express";
import OrdersController from "../../controllers/orders";

const router = Router();

router.get("/seller", OrdersController.getBySellerId); // +
router.get("/buyer/", OrdersController.getByBuyerId); // +
router.get("/good/:goodId", OrdersController.getByGoodId); // +
router.post("/:goodId", OrdersController.create); // +
router.patch("/status/:orderId", OrdersController.changeStatus); // +
router.patch("/:orderId", OrdersController.patchUnconfirmed); // +
router.delete("/:orderId", OrdersController.deleteUnconfirmed);
router.get("/:orderId", OrdersController.getById); // +

export default router;
