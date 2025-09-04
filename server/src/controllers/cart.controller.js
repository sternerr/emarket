import { CartGateway } from "../db/gateways/cart.gateway.js";
import { CartItemsGateway } from "../db/gateways/cartItems.gateway.js";

export default class CartController {
	static async getUserCart(req, res, next) {
		try {
			const cart = await CartGateway.findByUserId(req.user.id);
			const items = await CartItemsGateway.getItemsByCartId(cart.id);

			res.status(200).json({
				ok: true,
				message: "Succesfully retrieved cart from user id",
				data: {
					cart: items
				}
			});
		} catch (error) {
			next(error);
		}
	}

	static async addProductToCart(req, res, next) {
		try {
			const { productId } = req.body;

			const cart = await CartGateway.findByUserId(req.user.id);
			const item = await CartItemsGateway.addItem(cart.id, productId);

			res.status(200).json({
				ok: true,
				message: "Succesfully added product to"
			});
		} catch (error) {
			next(error);
		}
	}

	static async removeProductFromCart(req, res, next) {
		try {
			const { productId } = req.params;

			const cart = await CartGateway.findByUserId(req.user.id);
			const item = await CartItemsGateway.removeItem(cart.id, productId);

			res.status(200).json({
				ok: true,
				message: "Succesfully removed a product from cart"
			});
		} catch (error) {
			next(error);
		}
	}
}
