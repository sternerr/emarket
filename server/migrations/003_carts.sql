-- +goose Up
CREATE TABLE carts (
	id UUID PRIMARY KEY,
	"userId" UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	"createdAt" TIMESTAMP NOT NULL,
	"updatedAt" TIMESTAMP NOT NULL
);

INSERT INTO carts (id, "userId", "createdAt", "updatedAt")
SELECT gen_random_uuid(), id, NOW(), NOW()
FROM users;

-- +goose Down
DROP TABLE carts;
