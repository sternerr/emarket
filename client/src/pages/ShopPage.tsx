import { useEffect, useState } from "react";
import Header from "../components/Header"
import ProductCard from "../components/Product"
import ProductGrid from "../components/ProductGrid"

import type { Product } from "../context/CartProvider";
import Footer from "../components/Footer";

export default function ShopPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URI}/api/v1/products`);
				if (!response.ok) {
					throw new Error(`Failed to fetch products: ${response.statusText}`);
				}

				const data = await response.json();
				setProducts(data.data.products);
			} catch (error) {
				console.error('Fetch error:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [])

	return <>
		<Header />
		<main>
			<section className="block">
				<div className="section__title">
					<h1>All Products</h1>
				</div>
				{loading ? (
					<div>loading...</div>
				) : (
					<ProductGrid scrollable={false} length={4}>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</ProductGrid>
				)}
			</section>
		</main >
		<Footer />
	</>
}
