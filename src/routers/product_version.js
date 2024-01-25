import express from "express"
import { addVersion, deleteVersion, getAllVerion, getOneVerion, updateVersion } from "../controllers/product_version"
import { checkPermission } from "../middlewares/checkPermission"


const router = express.Router()
router.get('/versions',getAllVerion)
router.post('/versions',checkPermission,addVersion)
router.patch('/versions/:id',checkPermission,updateVersion)
router.get('/versions/:id',getOneVerion)
router.delete('/versions/:id',checkPermission,deleteVersion)
export default router