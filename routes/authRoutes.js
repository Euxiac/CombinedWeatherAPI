import express from "express";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import * as authController from '../controllers/authController.js'

const router = express.Router();

router.get("/get", authController.getAuth);

export default router;
