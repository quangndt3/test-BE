import express from "express"
import { add, getAll, getOne, update, xoa } from "../controllers/product"
const router = express.Router()

router.get('/products',getAll)
router.get('/products/:id',getOne)
router.post('/products',add)
router.patch('/products/:id',update)
router.delete('/products/:id',xoa)
export default router