import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

  //midleware
app.use(cors());
app.use(express.json());



// route -----
app.use("/api/auth", authRoutes);

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