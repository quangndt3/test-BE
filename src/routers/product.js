import express from "express"
import {getAll, getOne,add,update,remove } from "../controllers/product"
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router()

router.get("/product/getone/:id", getOne);
router.post("/product/add",checkPermission, add);
router.patch("/product/update/:id",checkPermission, update);
router.delete("/product/delete/:id",checkPermission,remove);
router.get("/product/list",getAll)
export default router