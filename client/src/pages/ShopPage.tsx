import Header from "../components/Header"
import Product from "../components/Product"
import ProductGrid from "../components/ProductGrid"

export default function ShopPage() {
	return <>
		<Header />
		<main>
			<section className="block">
				<div className="section__title">
					<h3>All Products</h3>
				</div>
				<ProductGrid scrollable={false} length={5}>
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
				</ProductGrid>
			</section>
		</main >
	</>
}
