import { v4 as uuidv4 } from "uuid";
import { pool } from "../pool.js";

export class ProductGateway {
	static async insert(product) {
		try {
			const id = uuidv4();
			const res = await pool.query(
				`INSERT INTO products(id, title, description, filename, price, stock, created_at, updated_at)
				VALUES($1, $2, $3, $4, $5, $6, NOW(), NOW())
				RETURNING *;`,
				[id, product.title, product.description, product.filename, product.price, product.stock]
			)

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}
}
