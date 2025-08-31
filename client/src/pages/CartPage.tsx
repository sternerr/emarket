import Header from "../components/Header"

import style from "../assets/css/cartPage.module.css";

import { useToast } from "../context/ToastProvider";
import { useCart, type Product } from "../context/CartProvider";
import Button from "../components/basic/Button";

export default function CartPage() {
	const { showToast } = useToast();
	const { getCartTotal, cart, removeFromCart } = useCart();

	return <>
		<Header />
		<main>
			<section className="block">
				<div className={style.cartWrapper}>
					<div className={style.itemCol}>
						<h1>Your cart</h1>
						<div className={style.table}>
							<div className={style.tableHead}>
								<div className={style.tableRow}>
									<div className={style.tableCol}>
										<span>Product</span>
									</div>
									<div className={style.tableCol}>
										<span>Price</span>
									</div>
									<div className={style.tableCol}>
										<span>Quantity</span>
									</div>
									<div className={style.tableCol}>
										<span>Total</span>
									</div>
								</div>
							</div>
							<div className={style.tableBody}>
								{cart.map((item: Product) => (
									<div key={item.id} className={style.tableRow}>
										<div className={style.tableCol}>
											<span>{item.title}</span>
											<Button
												variant="primary"
												design="text"
												onClick={() => removeFromCart(item.id)}
											>remove</Button>
										</div>
										<div className={style.tableCol}>
											<span>{item.price}</span>
										</div>
										<div className={style.tableCol}>
											<span>{item.quantity}</span>
										</div>
										<div className={style.tableCol}>
											<span>${item.price * item.quantity}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className={style.orderSumCol}>
						<div className={style.price}>
							<span><strong>Total</strong></span>
							<span><strong>${getCartTotal().toFixed(2)}</strong></span>
						</div>
						<Button
							variant="secondary"
							design="outlined"
							onClick={() => showToast(
								"Order functionality not implemented yet",
								"info",
								2000
							)}>Place order</Button>
					</div>
				</div>
			</section>
		</main>
	</>
}
