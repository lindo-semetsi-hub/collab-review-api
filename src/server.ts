import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import projectsRoutes from "./routes/projects";
import submissionsRoutes from "./routes/submissions";

import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

  //midleware
app.use(cors());
app.use(express.json());





// auth route -----
app.use("/api/auth", authRoutes);
//-------------------------------------

app.use("/api/projects", projectsRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/reviews", reviewsRoutes);

// ---- endpoint------
app.get("/", (req, res) => {
  res.send("API running");
});

// if running directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app; 