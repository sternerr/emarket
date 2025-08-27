import { v4 as uuidv4 } from "uuid";
import { pool } from "../pool.js";

export class ProductGateway {
	static async findAll() {
		try {
			const res = await pool.query("SELECT id, title, description, filename, price, stock FROM products");
			return res.rows;
		} catch (error) {
			throw error;
		}
	}

	static async findById(id) {
		if (!id) {
			throw new Error("Can't retrieve product without id");
		}

		try {
			const res = await pool.query("SELECT id, title, description, filename, price, stock FROM products WHERE id=$1", [id]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

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
