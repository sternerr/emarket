import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileManager {
	#destination = path.resolve(__dirname, "../public/uploads/");

	constructor() {
		this.ensureDirectoryExists();

		this.storage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, this.#destination);
			},
			filename: async (req, file, cb) => {
				const originalName = file.originalname.replaceAll(" ", "_");
				const ext = path.extname(originalName);
				const baseName = path.basename(originalName, ext);
				let finalName = originalName;
				let counter = 1;

				const isPutRequest = req.route && req.route.methods && req.route.methods.put;

				try {
					while (!isPutRequest && (await fs.access(path.join(this.#destination, finalName)).then(() => true).catch(() => false))) {
						finalName = `${baseName}_${counter}${ext}`;
						counter++;
					}
					cb(null, finalName);
				} catch (err) {
					cb(err);
				}
			},
		});

		this.upload = multer({
			storage: this.storage,
			limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
			fileFilter: (req, file, cb) => {
				const allowedTypes = /jpeg|jpg|png|pdf/;
				const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
				if (extname) {
					return cb(null, true);
				}
				cb(new Error("Invalid file type"));
			},
		});
	}

	async ensureDirectoryExists() {
		try {
			await fs.access(this.#destination);
		} catch {
			await fs.mkdir(this.#destination, { recursive: true });
		}
	}

	async deleteFile(filename) {
		const filePath = path.join(this.#destination, filename);
		try {
			await fs.access(filePath);
			await fs.unlink(filePath);
		} catch (err) {
			console.warn(`File ${filePath} not found or could not be deleted: ${err.message}`);
		}
	}
}

export default new FileManager();
