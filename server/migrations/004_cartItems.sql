-- +goose Up
CREATE TABLE "cartItems" (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	quantity INT NOT NULL,
	"cartId" UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
	"productId" UUID NOT NULL REFERENCES products(id),
	CONSTRAINT "cartProductUnique" UNIQUE ("cartId", "productId")
);

-- +goose Down
DROP TABLE "cartItems";
