import { Link } from "react-router";

import style from "../assets/css/footer.module.css";

export default function Footer() {
	return (
		<footer>
			<div className={["block", style.footer].join(" ")}>
				<div>
					<h3>E-Market</h3>
					<p>
						We make IT simple. From cutting-edge laptops to everyday accessories, our mission is to bring you the best tech at the best value—backed by expert support and fast, reliable delivery.
					</p>
				</div>
				<div>
					<h3>Company</h3>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/products">Shop</Link></li>
					</ul>
				</div>
				<div>
					<h3>Contact us</h3>
					<ul>
						<li><span>+46 12-345-67-89</span></li>
						<li><span>contact@emarket.com</span></li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
