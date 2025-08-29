import banner from "../assets/img/hero_bg.jpg";
import style from "../assets/css/hero.module.css";

export default function Hero() {
	return (
		<section className={[style.hero].join(" ")}>
			<h1>Power Up Your Tech. Simplify Your Life.</h1>
			<img src={banner} />
		</section>
	)
}
