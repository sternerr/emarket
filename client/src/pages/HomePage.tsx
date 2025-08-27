import Header from "../components/Header"
import Product from "../components/Product"
import ProductGrid from "../components/ProductGrid"

export default function HomePage() {
	return <>
		<Header />
		<main>
			<section className="block">
				<div className="section__title">
					<h3>Popular Products</h3>
				</div>
				<ProductGrid scrollable={true} length={4}>
					<Product />
					<Product />
					<Product />
					<Product />
				</ProductGrid>
			</section>
		</main >
	</>
}
