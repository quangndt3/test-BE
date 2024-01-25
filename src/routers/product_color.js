import express from "express"

import { add, deleteColor, getAll, getOne, updateColor } from "../controllers/product_color";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router()
router.get('/colors',getAll)
router.get('/colors/:id',getOne)
router.post('/colors',checkPermission,add)
router.patch('/colors/:id',checkPermission,updateColor)
router.delete('/colors/:id',checkPermission,deleteColor)
export default router