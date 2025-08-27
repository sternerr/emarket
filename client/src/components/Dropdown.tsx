import { useState } from "react";

import style from "../assets/css/dropdown.module.css";
import { Link } from "react-router";

export default function Dropdown() {
	const [open, setOpen] = useState<boolean>(false);

	return <>
		<div className={style.dropdownTrigger}>
			<span onClick={() => setOpen(!open)}>Username</span>
		</div>
		{open && (
			<div className={style.dropdownPortal}>
				<ul className={style.dropdownMenu}>
					<div>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/shop">Shop</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/contact">Contact</Link></li>
					</div>
					<li><Link to="/cart">Cart</Link></li>
					<li><Link to="my-orders">My Orders</Link></li>
					<li><a>Sign out</a></li>
				</ul>
			</div>
		)}
	</>;
}
