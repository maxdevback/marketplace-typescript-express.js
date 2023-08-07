import { Router } from "express";
import OrdersController from "../../controllers/orders";

const router = Router();

router.get("/:orderId", OrdersController.getById);
router.get("/seller/:sellerId", OrdersController.getBySellerId);
router.get("/buyer/:buyerId", OrdersController.getByBuyerId);
router.get("/good/:goodId", OrdersController.getByGoodId);
router.post("/", OrdersController.create);
router.patch("/status/:orderId", OrdersController.changeStatus);
router.patch("/", OrdersController.patchUnconfirmed);
router.delete("/:orderId", OrdersController.deleteUnconfirmed);

export default router;
