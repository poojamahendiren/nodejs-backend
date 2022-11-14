import express from 'express';
const router = express.Router();

import { signup,signin } from '../modules/registerModule.js';

router.post("/signup", signup);
router.post("/signin",signin);

export{ router }