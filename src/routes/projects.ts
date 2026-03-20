import { Router } from "express";
import { pool } from "../db";
import authMiddleware from "../middleware/auth";

const router = Router();


//-----------------------------------------------------------------
// create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const
     { name } = req.body;
    const owner_id = (req as any).user.id; 
    const result = await pool.query(
        
      "INSERT INTO projects (name, owner_id) VALUES ($1, $2) RETURNING *",
     
      [name, owner_id]

    );
    res.json(result.rows[0]);
  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//--------------------------------------------------
// list the projects
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (err) {

    console.error(err
        );
    res.status(500).json({ error: "Internal server error" });
  }
});



export default router;