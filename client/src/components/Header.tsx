import { Link } from "react-router";
import style from "../assets/css/header.module.css";
import Dropdown from "./Dropdown";

export default function Header() {

	return (
		<header className={style.header}>
			<nav className={[style.nav, "block"].join(" ")}>
				<ul className={style.menu}>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/products">Shop</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/contact">Contact</Link></li>
				</ul>
				<Dropdown />
			</nav>
		</header >
	);
}
