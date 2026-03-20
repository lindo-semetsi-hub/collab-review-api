import { Router } from "express";
        import { pool } from "../db";
import authMiddleware from "../middleware/auth";

const router = Router();



// adding the comment
router.post("/:submissionId", authMiddleware, async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { content } = req.body;
    const user_id = (req as any).user.id;




                                      // commenters can only be reviewers
    const role = (req as any).user.role;
    if (role === "submitter") {
      return res.status(403).json({ message: "Submitters cannot comment" });
    }


    const result = await pool.query(
      "INSERT INTO comments (submission_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [submissionId, user_id, content]
    );
    res.json(result.rows[0]);
  } catch (err)
   {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// list of the comments before submitting
router.get("/:submissionId", authMiddleware, async (req, res) => {
  try {
    const { submissionId } = req.params;
    const result = await pool.query(
      "SELECT c.*, u.name AS commenter_name FROM comments c JOIN users u ON c.user_id=u.id WHERE submission_id=$1",
      [submissionId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update the comment
router.patch("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { 
        commentId } = req.params;
    const
     { content } = req.body;
    const user_id = (req as any).user.id;

    // edit (author only tho)
    const result = await pool.query(
      "UPDATE comments SET content=$1 WHERE id=$2 AND user_id=$3 RETURNING *",
      [content, commentId, user_id]
    );

    if (result.rows.length === 0)
      return res.status(403).json({ message: "You can only edit your own comments" });

    res.json(result.rows[0]);
  } catch 
  (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//-----------------------------------------------------
// deleting a comment
router.delete("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const user_id = (req as any).user.id;



    //(its only the author that can delete)
    const result = await pool.query(
      "DELETE FROM comments WHERE id=$1 AND user_id=$2 RETURNING *",
      [commentId, user_id]
    );

    if (result.rows.length === 0)
      return res.status(403).json({ message: "You can only delete your own comments" });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});





export default router;