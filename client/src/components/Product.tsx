import img1 from "../assets/img/apple_earphone_image.png";
import style from "../assets/css/product.module.css";
import { Link, useNavigate } from "react-router";

import { useCart, type Product } from "../context/CartProvider";

export default function ProductCard({ product }: { product: Product }) {
	const { addToCart } = useCart();
	const navigate = useNavigate()

	return (
		<div className={style.product}>

			<Link to={"/products/" + product.id}>
				<div className={style.productImg}>
					<img src={img1} />
				</div>
			</Link>
			<div className={style.productInfo}>
				<div className={style.productInfoRow}>
					<Link to={"/products/" + product.id}>
						<span><strong>{product.title}</strong></span>
					</Link>
				</div>
				<div className={style.productInfoRow}>
					<span>${product.price}</span>
					<button onClick={() => { addToCart(product); navigate("/cart"); }}>Buy now</button>
				</div>
			</div>
		</div >
	);
}
