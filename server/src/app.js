import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import productRouter from "./routes/product.route.js";
import authRouter from "./routes/auth.route.js";

class App {
	#express

	constructor() {
		this.#express = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.#express.use('/uploads', express.static(__dirname + "/public/uploads"));
		this.#express.use(cors({
			origin: "*",
		}));
		this.#express.use(express.json());
		this.#express.use(express.urlencoded({ extended: true }));
	}

	routes() {
		this.#express.use("/api/v1/products", productRouter);
		this.#express.use("/api/v1/auth", authRouter);

		this.#express.get("/", (_, res) => {
			res.json({ message: "Welcome to e-market backend" });
		});
	}

	errorHandler() {
		this.#express.use((err, _, res) => {
			console.error(err.stack);
			res.status(500).json({ error: "internal server error" });
		});
	}

	listen(port) {
		this.#express.listen(port, () => {
			console.log(`Ecommerce backend @ http://localhost:${port}`);
		})
	}
}

export default new App();
