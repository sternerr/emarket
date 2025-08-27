import Header from "../components/Header"
import ProductCard from "../components/Product"
import ProductGrid from "../components/ProductGrid"

import type { Product } from "../context/CartProvider";

const products: Product[] = [
	{
		id: '1',
		title: 'Sample T-Shirt',
		price: 19.99,
		quantity: 10,
	},
	{
		id: '2',
		title: 'Sample Hoodie',
		price: 39.99,
		quantity: 10,
	},
	{
		id: '3',
		title: 'Sample Cap',
		price: 14.99,
		quantity: 10,
	},
	{
		id: '4',
		title: 'Sample Sneakers',
		price: 79.99,
		quantity: 10,
	},
];

export default function ShopPage() {
	return <>
		<Header />
		<main>
			<section className="block">
				<div className="section__title">
					<h3>All Products</h3>
				</div>
				<ProductGrid scrollable={false} length={5}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ProductGrid>
			</section>
		</main >
	</>
}
