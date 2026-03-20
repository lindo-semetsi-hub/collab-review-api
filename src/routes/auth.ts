import express from "express";
import { pool } from "../db.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
    [name, email, hashed]
  );

  res.json(result.rows[0]);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  const user = result.rows[0];

  if (!user) return res.status(400).send("User not found");


  const valid = await bcrypt.compare(password, user.password);



  if (!valid) return res.status(400).send("Incorrect password");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

  res.json({ token });
});


export default router;