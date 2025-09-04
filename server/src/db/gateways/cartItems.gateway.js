import { v4 as uuidv4 } from "uuid";
import { pool } from "../pool.js";

export class CartItemsGateway {
	static async addItem(cartId, productId, quantity = 1) {
		try {
			const res = await pool.query(
				`INSERT INTO "cartItems" (id, "cartId", "productId", quantity)
				VALUES ($1, $2, $3, $4)
				ON CONFLICT ("cartId", "productId")
				DO UPDATE SET quantity = "cartItems".quantity + EXCLUDED.quantity
				RETURNING *`,
				[uuidv4(), cartId, productId, quantity]
			);

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async removeItem(cartId, productId) {
		try {
			const res = await pool.query(
				`
				WITH updated AS (
					UPDATE "cartItems"
					SET quantity = quantity - 1
					WHERE "cartId" = $1 AND "productId" = $2 AND quantity > 1
					RETURNING *
				)
				DELETE FROM "cartItems"
				WHERE "cartId" = $1 AND "productId" = $2 AND quantity = 1
				RETURNING *;
				`,
				[cartId, productId]
			);

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async getItemsByCartId(cartId) {
		const result = await pool.query(
			`SELECT p.*, ci.quantity
			FROM "cartItems" AS ci
		       	JOIN products AS p ON ci."productId" = p.id
		       	WHERE ci."cartId" = $1`,
			[cartId]
		);

		return result.rows;
	}
}
