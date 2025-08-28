import img1 from "../assets/img/apple_earphone_image.png";
import style from "../assets/css/product.module.css";
import { Link, useNavigate } from "react-router";

import { useCart, type Product } from "../context/CartProvider";
import { useAuth } from "../context/auth.context";
import { useToast } from "../context/ToastProvider";

export default function ProductCard({ product }: { product: Product }) {
	const { user } = useAuth();
	const { showToast } = useToast();
	const { addToCart } = useCart();
	const navigate = useNavigate()

	const handleBuy = () => {
		if (!user) {
			showToast("You have to be logged in", "info");
			return
		}

		addToCart(product);
		navigate("/cart");
	}

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
					<button onClick={handleBuy}>Buy now</button>
				</div>
			</div>
		</div >
	);
}
