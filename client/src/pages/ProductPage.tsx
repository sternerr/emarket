import Header from "../components/Header"
import { useCart, type Product } from "../context/CartProvider";

import img1 from "../assets/img/apple_earphone_image.png";
import style from "../assets/css/productPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

export default function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | undefined>(undefined);
	const { addToCart } = useCart();
	const navigate = useNavigate();

	useEffect(() => {
		const p = products.find(p => p.id === id);
		setProduct(p);
	}, [])

	return <>
		<Header />
		<main>
			<section className="block">
				<div className={style.product}>
					<div className={style.productImg}>
						<img src={img1} />
					</div>
					<div className={style.productInfo}>
						<div>
							<h1>{product?.title}</h1>
							<p>Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.</p>
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
			</section>
		</main >
	</>
}
