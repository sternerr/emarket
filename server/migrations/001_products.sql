-- +goose Up
CREATE TABLE products(
	id UUID PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	filename TEXT NOT NULL,
	price REAL NOT NULL,
	stock INTEGER NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL
);

-- +goose Down
DROP TABLE products;
