import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';
import {router} from './router/employeeRouter.js'
import {router as userRouter} from './router/registerRouter.js'
import {authenticateUser} from './modules/authModule.js'
import {router as productRouter} from './router/productRouter.js'
//const {auth} = require("./modules/authModule");
// import {router as userRouter} from './router/newroute.js'


// const express = require("express");
// const dotenv = require("dotenv");
// const employeeRouter = require("./router/employeeRouter");
// const {MongoClient} = require("mongodb");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


       
// module.exports.createConnection = async function() {
//             try {
//                const client = new MongoClient(process.env.MONGODB_UR);
//                await client.connect();
//                return client;
            
//            } catch (err) {
//                console.log("err");
//           }
//        }


 export async function createConnection(){
   const client = new MongoClient(process.env.MONGODB_URL);
   await client.connect();
   return client;
}

app.use("/register",userRouter);

app.use("/",authenticateUser);

 app.use("/employees",router);
app.use("/products",productRouter); 
 
//  app.use("/newroute",userRouter) check line no 5
    

// app.use("/posts",(req,res,next) => {
//     res.send([
//     {
//         name:"aaa",
//         age:20,
//     },
//     {
//         name:"bbb",
//         age:23,
//     },
//     ]);
// });

app.listen(process.env.PORT,()=>console.log("connected to server"));