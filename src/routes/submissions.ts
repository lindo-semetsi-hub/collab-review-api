import { Router } from "express";
import { pool } from "../db";
import authMiddleware from "../middleware/auth";

const router = Router();

// create the submission
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { project_id, code } = req.body;

    const user_id = (req as any).user.id; 

    const result = await pool.query(
      "INSERT INTO submissions (project_id, user_id, code) VALUES ($1, $2, $3) RETURNING *",
      [project_id, user_id, code]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// based on projects
router.get("/project/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await pool.query(
      "SELECT * FROM submissions WHERE project_id=$1",
      [projectId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// updating the submission status
router.patch("/:submissionId/status", authMiddleware, async (req, res) => {
  try {
    const { submissionId } = req.params;

    const { status } = req.body; 

    const result = await pool.query(

      "UPDATE submissions SET status=$1 WHERE id=$2 RETURNING *",

      [status, submissionId]
    );
    res.json(result.rows[0]);
  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;