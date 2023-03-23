// const products = [
//     { id: 1, name: "Product A" },
//     { id: 2, name: "Product B" },
// ];

// // import http from "http";

// // const server = http.createServer(function (req, res) {

// //     if (req.url == "/") {
// //         res.setHeader("Content-Type", "text/html");
// //         res.end(`
// //             <form action="/api/products" method="post">
// //                 <input type="text" name="name"/>
// //                 <button type="submit">Add</button>
// //             </form>
// //         `);
// //     }
// //     if (req.url === "/api/products" && req.method === "POST") {
// //         const body = [];
// //         req.on("data", function (chunk) {
// //             body.push(chunk); // [ <Buffer 6e 61 6d 65 3d 50 72 6f 64 75 63 74 20 41> ]
// //         });
// //         req.on("end", function () {
// //             const parsedBody = Buffer.concat(body).toString(); // name=Product A
// //             const name = parsedBody.split("=")[1]; // Product A
// //             console.log(name);
// //         });
// //         // res.setHeader("Content-Type", "application/json");
// //         // res.end(JSON.stringify(x));
// //     }
// // });
// // server.listen(8080, function () {
// //     console.log("Server running on port 8080");
// // });

// import express from "express";

// const app = express();

// app.use(express.json());

// app.get("/api/products", async function (req, res) {
//     const response = await fetch("https://63f5d86059c944921f67a58c.mockapi.io/products");
//     const products = await response.json();
//     res.json(products);
// });
// app.get("/api/products/:id", async function (req, res) {
//     const id = req.params.id;
//     const response = await fetch(`https://63f5d86059c944921f67a58c.mockapi.io/products/${id}`);
//     const product = await response.json();
//     res.json({
//         message: "Detail product",
//         data: product,
//     });
// });
// app.post("/api/products", function (req, res) {
//     // req là 1 object
//     // url, method, body, params, query
//     console.log(req.body);
// });

// app.listen(8080, function () {
//     console.log("Server running on port 8080");
// });
// import http from "http"
const products = [
    {
        id: 1,
        name: "quang"

    },
    {
        id: 1,
        name: "quang"

    }

]
// const server = http.createServer((req,res)=>{
//     const products=[
//         {
//             id: 1,
//             name: "quang"

//         },
//         {
//             id: 1,
//             name: "quang"

//         }

//     ]
//     if(req.url==="/"){
//         res.setHeader("Content-Type", "application/json")
//         res.end(`
//         <form>
//         <input type="text" name="name">
//         </form>
//         `)

//     }
//     if(req.url==="/product"){
//         res.setHeader("Content-Type", "application/json")
//         res.end(JSON.stringify(products))   
//     }
// })
// server.listen(1234,function(){
//     console.log("đã chạy được");
//
// import express  from "express"
// const app = express()
// app.use(express.json());
// app.listen(1234,()=>{
//     console.log("đã chạy")
// })
// app.get('/',(req,res)=>{
//     console.log('HomePage')
// })

// app.get("/product", async function (req, res) {
//     const response = await fetch("https://63f5d86059c944921f67a58c.mockapi.io/products");
//     const products = await response.json();
//     res.json(products);
// });

import express from "express";
import productRouter from "./routers/product";
import mongoose  from "mongoose";
import routerUser from "./routers/user";
const app = express();
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", routerUser)
mongoose.connect("mongodb://127.0.0.1:27017/we17309").then(()=> console.log('kết nốt'))

export const viteNodeApp = app;