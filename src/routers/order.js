import { addOrder, getAllOrder, getDetailOrder, getOneOrder, updateOrder } from "../controllers/order";
import express from "express"
const router = express.Router()


router.get("/order/:id", getOneOrder);
router.get("/order",getAllOrder)
router.post("/order", addOrder);
router.patch("/order/:id", updateOrder);
router.get("/orderDetail/:id", getDetailOrder)
export default router