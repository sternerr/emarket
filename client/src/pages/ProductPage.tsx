import Header from "../components/Header"

import img1 from "../assets/img/apple_earphone_image.png";

import style from "../assets/css/productPage.module.css";

export default function ProductPage() {
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
							<h1>Apple AirPods Pro 2nd gen</h1>
							<p>Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.</p>
						</div>
						<div>
							<span><strong>$399</strong></span>
						</div>
						<div>
							<button>Add to cart</button>
							<button>Buy</button>
						</div>
					</div>
				</div>
			</section>
		</main >
	</>
}
