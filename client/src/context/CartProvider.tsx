import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export type Product = {
	id: string;
	title: string;
	price: number;
	quantity: number;
	img?: string;
}

type CartContextType = {
	cart: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (id: string) => void;
	getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Product[]>(
		localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!)
			: []
	)

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product: Product) => {
		setCart((prev) => {
			const productInCart = prev.find((p => p.id === product.id));
			if (productInCart) {
				return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
			}

			return [...prev, { ...product, quantity: 1 }];
		})
	}

	const removeFromCart = (id: string) => {
		setCart((prev) => {
			const productInCart = prev.find((p => p.id === id));
			if (productInCart && productInCart.quantity === 1) {
				return prev.filter(p => p.id !== id);
			}

			return prev.map((p) =>
				p.id === id ? { ...p, quantity: p.quantity - 1 } : p
			);
		})
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
