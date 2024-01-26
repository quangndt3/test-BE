import express from "express"
import { signin, signup } from "../controllers/user"

const router = express.Router()

router.post("/user/login", signin)
router.post("/user/signup", signup)

export default router
