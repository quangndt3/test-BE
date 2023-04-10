import express from "express"
import { add, getAll, getOne, xoa } from "../controllers/comments";
import { checkPermission } from "../middlewares/checkPermission";



const router = express.Router()


router.get("/comments/:id", getOne);
router.get("/comments",getAll)
router.post("/comments", add);
router.delete("/comments/:id" ,checkPermission,xoa)

export default router