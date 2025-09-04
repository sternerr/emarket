import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth.context";

export type Product = {
	id: string;
	title: string;
	description: string;
	price: number;
	quantity: number;
	filename: string;
}

type CartContextType = {
	cart: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (id: string) => void;
	getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const { user } = useAuth();
	const [cart, setCart] = useState<Product[]>([])

	useEffect(() => {
		if (!user) {
			return;
		}

		async function loadCart() {
			const data = await fetch(`${import.meta.env.VITE_API_URI}/api/v1/cart/`, {
				headers: {
					"Authorization": `Bearer ${user.token}`
				}
			}).then(r => r.json());

			setCart(data.data.cart);
		}

		loadCart();
	}, [user]);

	const addToCart = async (product: Product) => {
		if (!user) {
			return;
		}

		await fetch(`${import.meta.env.VITE_API_URI}/api/v1/cart/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${user.token}`
			},
			body: JSON.stringify({ productId: product.id }),
		});

		await getCart()
	}

	const removeFromCart = async (productId: string) => {
		if (!user) {
			return;
		}

		await fetch(`${import.meta.env.VITE_API_URI}/api/v1/cart/${productId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${user.token}`
			},
		});

		await getCart()
	}

	const getCart = async () => {
		if (!user) {
			return;
		}

		const data = await fetch(`${import.meta.env.VITE_API_URI}/api/v1/cart/`, {
			headers: {
				"Authorization": `Bearer ${user.token}`
			}
		}).then(r => r.json());

		setCart(data.data.cart);
	}

	const getCartTotal = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	}

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartTotal }} >
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
}
