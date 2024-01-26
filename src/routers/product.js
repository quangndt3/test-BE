import express from "express"
import {getAll, getOne,add,update,remove } from "../controllers/product"
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router()

router.get("/product/:id", getOne);
router.post("/product/add", add);
router.patch("/product/update/:id", update);
router.delete("/product/delete/:id",remove);
router.get("/product",getAll)
export default router