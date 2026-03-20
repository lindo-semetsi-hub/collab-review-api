import { Router } from "express";
import { pool } from "../db";
import authMiddleware from "../middleware/auth";

const router = Router();



//-------------------------------------------------------------------------------------
// submission approval
router.post("/:submissionId/approve", authMiddleware, async (req, res) => {
  try {
    const { submissionId } = req.params;

    const user_id = (req as any).user.id;

    const role = (req as any).user.role;



    if (role === "submitter") {
      return res.status(403).json({ message: "Submitters cannot approve" });
    }

    const result = await pool.query(
      "UPDATE submissions SET status='approved' WHERE id=$1 RETURNING *",
      [submissionId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



//---------------------------------------------------------------------------------
// change requests
router.post("/:submissionId/request-changes", authMiddleware, async (req, res) => {
  try {
    const { submissionId } = req.params;
    const user_id = (req as any).user.id;
    const role = (req as any).user.role;

    if (role === "submitter") {
      return res.status(403).json({ message: "Submitters cannot request changes" });
    }

    const result = await pool.query(
      "UPDATE submissions SET status='changes_requested' WHERE id=$1 RETURNING *",
      [submissionId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------------------------------------------------------------------------------------
// review history 
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT s.id, s.project_id, s.user_id, s.status, s.code, u.name AS submitter_name FROM submissions s JOIN users u ON s.user_id=u.id ORDER BY s.id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;