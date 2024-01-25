
import express from "express";
import productRouter from "./src/routers/product";
import categoryRouter from "./src/routers/category"
import mongoose  from "mongoose";
import routerUser from "./src/routers/user";
import productColorRouter from "./src/routers/product_color"
import productVersionRouter from "./src/routers/product_version"
import orderrouter from "./src/routers/order"
import commentRouter from "./src/routers/comment"
import couponeRouter from "./src/routers/coupon"
import cors from "cors"
export const app = express();
app.use(express.json());
app.use(cors())
app.use("/api", productRouter);
app.use("/api", routerUser)
app.use("/api", categoryRouter)
app.use("/api", productColorRouter)
app.use("/api", commentRouter);
app.use("/api", productVersionRouter);
app.use("/api", orderrouter);
app.use("/api", couponeRouter);
mongoose.connect("mongodb://127.0.0.1:27017/we17309").then(()=> console.log('kết nốt'))
export const viteNodeApp = app;