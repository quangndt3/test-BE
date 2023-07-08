import express from "express"

import { checkPermission } from "../middlewares/checkPermission";
import { add, getAll, update } from "../controllers/product_color";

const router = express.Router()
router.get('/colors',getAll)
router.post('/colors',add)
router.patch('/colors',update)
export default router