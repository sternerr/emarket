import jwt from "jsonwebtoken"

import { JWT_SECRET } from "../config/env.js";
import { UserGateway } from "../db/gateways/user.gateway.js";

export async function authorize(req, res, next) {
	try {
		let token;

		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const decoded = jwt.verify(token, JWT_SECRET);

		const user = await UserGateway.findByID(decoded.userId);
		if (!user) return res.status(401).json({ message: "Unauthorized user" });

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized", error: error.message, });
	}
}
