// const express = require("express");
import express from 'express';
const router = express.Router();
import {authorisedUser } from '../modules/authModule.js';

// const employeeModule = require("../modules/employeeModule");
import { getEmployees, updateEmployees, createEmployees, deleteEmployees } from '../modules/employeeModule.js';


router.get("/get", getEmployees);

router.put("/update/:id", authorisedUser , updateEmployees);

router.post("/create", authorisedUser , createEmployees);

router.delete("/delete/:id", authorisedUser , deleteEmployees);

export{ router }

