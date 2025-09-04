import { v4 as uuidv4 } from "uuid";
import { pool } from "../pool.js";

export class CartGateway {
	static async createCart(id) {
		try {
			const res = await pool.query(
				`INSERT INTO carts (id,  userId)
				VALUES ($1, $2)
				RETURNING *`,
				[uuidv4(), id]
			);

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async findByUserId(userId) {
		try {
			const res = await pool.query('SELECT * FROM carts WHERE "userId"=$1', [userId]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}
}
