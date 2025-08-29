import Header from "../components/Header";
import Button from "../components/basic/Button";

import { useCart, type Product } from "../context/CartProvider";

import style from "../assets/css/productPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../context/ToastProvider";
import { useAuth } from "../context/auth.context";
import Footer from "../components/Footer";

export default function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	const { user } = useAuth();
	const { addToCart } = useCart();
	const { showToast } = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/v1/products/${id}`);
				if (!response.ok) {
					throw new Error(`Failed to fetch products: ${response.statusText}`);
				}

				const data = await response.json();
				setProduct(data.data.product)
			} catch (error) {
				console.error('Fetch error:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [])

	const handleBuy = () => {
		if (!user) {
			showToast("You have to be logged in", "info");
			return
		}

		if (product) {
			addToCart(product);
			navigate("/cart");
		}
	}

	const handleAddToCart = () => {
		if (!user) {
			showToast("You have to be logged in", "info");
			return
		}

		if (product) {
			addToCart(product);
		}
	}

	return <>
		<Header />
		<main>
			<section className="block">
				{loading ? (<div>loading...</div>) : (
					<div className={style.product}>
						<div className={style.productImg}>
							<img src={`http://${import.meta.env.VITE_API_URI}/uploads/${product?.filename}`} />
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
								<Button
									variant="secondary"
									design="outlined"
									onClick={handleAddToCart}
								>Add to cart</Button>

								<Button
									variant="primary"
									design="filled"
									onClick={handleBuy}
								>Buy</Button>
							</div>
						</div>
					</div>
				)}
			</section>
		</main >
		<Footer />
	</>
}
