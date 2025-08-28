import Header from "../components/Header"
import { useCart, type Product } from "../context/CartProvider";

import img1 from "../assets/img/apple_earphone_image.png";
import style from "../assets/css/productPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	const { addToCart } = useCart();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/v1/products/${id}`);
				if (!response.ok) {
					throw new Error(`Failed to fetch products: ${response.statusText}`);
				}

				const data = await response.json();
				console.log(data);
				setProduct(data.data.product)
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
				{loading ? (<div>loading...</div>) : (
					<div className={style.product}>
						<div className={style.productImg}>
							<img src={img1} />
						</div>
						<div className={style.productInfo}>
							<div>
								<h1>{product?.title}</h1>
								<p>{product?.description}</p>
							</div>
							<div>
								<span><strong>${product?.price}</strong></span>
							</div>
							<div>
								<button onClick={() => addToCart(product!)}>Add to cart</button>
								<button onClick={() => { addToCart(product!); navigate("/cart"); }}>Buy</button>
							</div>
						</div>
					</div>
				)}
			</section>
		</main >
	</>
}
