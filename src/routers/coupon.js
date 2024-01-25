
import express from "express"
import { addCoupon, getAllCoupon, getOneCoupon, getOneCouponByCode, updateCoupon } from "../controllers/coupon";
const router = express.Router()


router.get("/coupon/:id", getOneCoupon);
router.get("/coupon",getAllCoupon)
router.post("/coupon", addCoupon);
router.patch("/coupon/:id", updateCoupon);
router.get("/couponbycode/:code", getOneCouponByCode);

export default router