// postgresql://neondb_owner:npg_kIbiH01rRCzA@ep-mute-violet-amiqd2vm-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});