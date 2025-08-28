import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { UserGateway } from "../db/gateways/user.gateway.js";

export default class AuthController {
	static async signUp(req, res, next) {
		try {
			const { email, password } = req.body;
			if (password.length < 8) {
				res.status(409).json({
					ok: false,
					message: "Password needs to be atlesst 8 characters long",
				});
				return;
			}

			const existing = await UserGateway.findByEmail(email);
			if (existing) {
				res.status(409).json({
					ok: false,
					message: "User already exists",
				});
				return;
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			const user = await UserGateway.insert({ email: email, password: hashedPassword });

			const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

			res.status(201).json({
				ok: true,
				message: "User created successfully",
				data: {
					token,
					user: {
						id: user.id,
					}
				}
			});
		} catch (error) {
			next(error)
		}
	}

	static async signIn(req, res, next) {
		try {
			const { email, password } = req.body;

			const user = await UserGateway.findByEmail(email);
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				res.status(424).json({
					ok: false,
					message: "Invalid email or password",
				});
			}

			const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

			res.status(200).json({
				ok: true,
				message: "User signed in successfully",
				data: {
					token,
					user: {
						id: user.id,
					}
				}
			});
		} catch (error) {
			next(error)
		}
	}
}
