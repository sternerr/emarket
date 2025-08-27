import { useState } from "react";

import style from "../assets/css/dropdown.module.css";

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
						<li><a>Home</a></li>
						<li><a>Shop</a></li>
						<li><a>About</a></li>
						<li><a>Contact</a></li>
					</div>
					<li><a>Cart</a></li>
					<li><a>My Orders</a></li>
					<li><a>Sign out</a></li>
				</ul>
			</div>
		)}
	</>;
}
