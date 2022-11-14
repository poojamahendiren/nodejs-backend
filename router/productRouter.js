import express from 'express';
const router = express.Router();
import {authorisedUser } from '../modules/authModule.js';

// const employeeModule = require("../modules/employeeModule");
import { getProducts, updateProducts, createProducts, deleteProducts } from '../modules/productModule.js';


router.get("/get", getProducts);

router.put("/update/:id", authorisedUser , updateProducts);

router.post("/create", authorisedUser , createProducts);

router.delete("/delete/:id", authorisedUser , deleteProducts);

export{ router }
