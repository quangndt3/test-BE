import express from "express"
import { add, getAll, getOne, update, xoa } from "../controllers/product"
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router()

router.get("/products", getAll);
router.get("/products/:id", getOne);
router.post("/products", checkPermission, add);
router.patch("/products/:id", checkPermission, update);
router.delete("/products/:id", checkPermission,xoa);
export default router