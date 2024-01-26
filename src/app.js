
import express from "express";
import productRouter from "./src/routers/product";
import mongoose  from "mongoose";
import routerUser from "./src/routers/user";
import routerUpload from "./src/routers/upload";
import cors from "cors"
export const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/v1", productRouter);
app.use("/api", routerUser)
app.use("/api", routerUpload)
mongoose.connect("mongodb+srv://quangndt7:123@projecttesting.2dix4ri.mongodb.net/projectTesting?retryWrites=true&w=majority").then(()=> console.log('kết nốt'))
export const viteNodeApp = app;