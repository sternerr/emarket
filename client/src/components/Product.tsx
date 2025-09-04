import style from "../assets/css/product.module.css";
import { Link, useNavigate } from "react-router";

import { useCart, type Product } from "../context/CartProvider";
import { useAuth } from "../context/auth.context";
import { useToast } from "../context/ToastProvider";
import Button from "./basic/Button";

export default function ProductCard({ product }: { product: Product }) {
	const { user } = useAuth();
	const { showToast } = useToast();
	const { addToCart } = useCart();
	const navigate = useNavigate()

	const handleBuy = () => {
		addToCart(product);
		navigate("/cart");
	}

	return (
		<div className={style.product}>
			<Link to={"/products/" + product.id}>
				<div className={style.productImg}>
					<img src={`${import.meta.env.VITE_API_URI}/uploads/${product.filename}`} />
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
					<Button design="outlined" variant="secondary" onClick={handleBuy}>Buy now</Button>
				</div>
			</div>
		</div >
	);
}
