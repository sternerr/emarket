import style from "../assets/css/header.module.css";
import Dropdown from "./Dropdown";

export default function Header() {

	return (
		<header className={style.header}>
			<nav className={[style.nav, "block"].join(" ")}>
				<ul className={style.menu}>
					<li><a>Home</a></li>
					<li><a>Shop</a></li>
					<li><a>About</a></li>
					<li><a>Contact</a></li>
				</ul>
				<Dropdown />
			</nav>
		</header >
	);
}
