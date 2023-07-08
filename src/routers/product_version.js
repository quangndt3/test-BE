import express from "express"
import { add, getAll } from "../controllers/product_version"


const router = express.Router()
router.get('/versions',getAll)
router.post('/versions',add)
export default router