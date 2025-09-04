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
			const localCart = localStorage.getItem("cart");
			setCart(localCart ? JSON.parse(localCart) : []);
			return;
		}

		getCart();
	}, [user]);

	useEffect(() => {
		if (!user) {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart, user]);

	const addToCart = async (product: Product) => {
		if (!user) {
			setCart((prev: Product[]) => {
				const existing = prev.find(p => p.id === product.id);
				if (existing) {
					return prev.map(p =>
						p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
					);
				}

				return [...prev, { ...product, quantity: 1 }];
			});

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
			setCart((prev: Product[]) => {
				const existing = prev.find(p => p.id === productId);
				if (existing && existing.quantity === 1) {
					return prev.filter(p => p.id !== productId);
				}

				return prev.map(p =>
					p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
				);
			});
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
