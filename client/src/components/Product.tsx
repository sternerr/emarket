import img1 from "../assets/img/apple_earphone_image.png";

import style from "../assets/css/product.module.css";
import { Link } from "react-router";

export default function Product() {
	return (
		<div className={style.product}>

			<Link to="">
				<div className={style.productImg}>
					<img src={img1} />
				</div>
			</Link>
			<div className={style.productInfo}>
				<div className={style.productInfoRow}>
					<Link to="">
						<span><strong>Apple AirPods Pro 2nd gen</strong></span>
					</Link>
				</div>
				<div className={style.productInfoRow}>
					<span>$399</span>
					<button>Buy now</button>
				</div>
			</div>
		</div>
	);
}
