
import express from "express";
import productRouter from "./src/routers/product";
import categoryRouter from "./src/routers/category"
import mongoose  from "mongoose";
import routerUser from "./src/routers/user";
import productColorRouter from "./src/routers/product_color"
import productVersionRouter from "./src/routers/product_version"
import commentRouter from "./src/routers/comment"
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
mongoose.connect("mongodb+srv://quangndt7:X2OjDX702ke09EXo@phonestore.qf4udr5.mongodb.net/phoneStore").then(()=> console.log('kết nốt'))

export const viteNodeApp = app;