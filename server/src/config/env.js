import { config } from "dotenv"

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

function getEnv(key, required = true) {
	const value = process.env[key];
	if (!value && required) {
		throw new Error(`Missing environemnt variable: ${key}`);
	}

	return value ?? "";
}

export const PORT = parseInt(getEnv("PORT", false));
export const DB_URI = getEnv("DB_URI", true);
export const JWT_SECRET = getEnv("JWT_SECRET", true);
export const JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN", true)
