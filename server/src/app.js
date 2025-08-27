import express from "express";

class App {
	#express

	constructor() {
		this.#express = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.#express.use(express.json());
		this.#express.use(express.urlencoded({ extended: true }));
	}

	routes() {
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
