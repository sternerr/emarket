import { ProductGateway } from "../db/gateways/product.gateway.js";

export default class ProductController {
	static async createProduct(req, res, next) {
		try {
			if (!req.file) {
				throw new Error("No image exists");
			}

			const { title, description, price, stock } = req.body;

			const product = await ProductGateway.insert({
				title,
				description,
				price,
				stock,
				filename: req.file.filename,
			});

			res.status(201).json({
				ok: true,
				message: "Product created successfully",
				data: product,
			});

		} catch (error) {
			next(error)
		}
	}

	static async getProducts(req, res, next) {
		try {
			const products = await ProductGateway.findAll();

			res.status(200).json({
				ok: true,
				message: "Retrived products successfully",
				data: {
					products: products
				}
			});
		} catch (error) {
			next(error)
		}
	}

	static async getProduct(req, res, next) {
		try {
			const { id } = req.params;
			const product = await ProductGateway.findById(id);

			res.status(200).json({
				ok: true,
				message: "Retrived products successfully",
				data: {
					product: product
				}
			});
		} catch (error) {
			next(error)
		}
	}
}
