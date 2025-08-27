import { Pool } from "pg";
import { DB_URI } from "../config/env.js";

export const pool = new Pool({
	connectionString: DB_URI,
	max: 10
});
