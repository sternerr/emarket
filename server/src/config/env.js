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
