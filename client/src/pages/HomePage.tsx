import { useEffect, useState } from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/Product"
import ProductGrid from "../components/ProductGrid"
import Hero from "../components/Hero";
import Button from "../components/basic/Button";
import { Link } from "react-router-dom";

import type { Product } from "../context/CartProvider";

export default function HomePage() {
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
				console.log(data);
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
			<Hero />
			<section className="block">
				<div className="section__title">
					<h3>Popular Products</h3>
				</div>
				{loading ? (
					<div>loading...</div>
				) : (
					<ProductGrid scrollable={true} length={4}>
						{products.map((product, index) => {
							if (index < 4) {
								return <ProductCard key={product.id} product={product} />
							}
						})}
					</ProductGrid>
				)}
				<div className="section__button">
					<Link to="/products"><Button variant="primary" design="filled">See more products</Button></Link>
				</div>
			</section>
		</main >
		<Footer />
	</>
}
