import { Link } from "react-router-dom";

import banner from "../assets/img/hero_bg.jpg";
import style from "../assets/css/hero.module.css";
import Button from "./basic/Button";

export default function Hero() {
	return (
		<section className={["block", style.hero].join(" ")}>
			<div className={style.content}>
				<h1>Power Up Your Tech. Simplify <span>Your Life.</span></h1>
				<p>
					Upgrade your world with the latest phones, headphones, tablets, and computers—all in one place. Find trusted brands, smart deals, and fast delivery designed to keep your life connected and effortless.				</p>
				<Link to="/products"><Button variant="secondary" design="outlined">Explore</Button></Link>
			</div>
			<div className={style.img}>
				<img src={banner} />
			</div>
		</section>
	)
}
