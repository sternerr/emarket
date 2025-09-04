import { pool } from "../pool.js";
import { v4 as uuidv4 } from "uuid";

export class UserGateway {
	static async findByID(id) {
		try {
			const res = await pool.query("SELECT id, email FROM users WHERE id=$1", [id]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async findByEmail(email) {
		try {
			const res = await pool.query("SELECT id, email, password from users WHERE email=$1", [email]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async insert(user) {
		try {
			const id = uuidv4();
			const res = await pool.query(`
				INSERT INTO users(id, email, password, created_at, updated_at)
				VALUES($1, $2, $3, NOW(), NOW())
				RETURNING *`,
				[id, user.email, user.password]
			)

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}
}
