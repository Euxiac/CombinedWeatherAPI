import express from "express";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getAuth = (req, res) => {
  try {
    const accessToken = generateAccessToken();
    //console.log(accessToken);
    res.json(accessToken);
  } catch {
    console.log("this failed");
  }
};

function generateAccessToken() {
  return jwt.sign({ DUCK: "DUCK" }, process.env.API_TOKEN, {
    expiresIn: "1800s",
  });
}

export function authenticateToken(req, res, next) {
  if (req.headers["x-internal-request"] === "true") {
    console.log("internal request");
    next(); // Skip authorization for internal requests
  }else {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.API_TOKEN, (err, DUCK) => {
      console.log(`jwt verify ${err}`);

      if (err) return res.sendStatus(403);
      next();
    });
  }
}
