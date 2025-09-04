import { useState } from "react";

import style from "../assets/css/dropdown.module.css";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";

import Button from "./basic/Button";

export default function Dropdown() {
	const { user, logout } = useAuth();
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout()
		navigate("/");
	}

	return <>
		<div className={style.dropdownTrigger}>
			{user ? (<span onClick={() => setOpen(!open)}>Profile</span>) :
				(<Link to="/sign-in"><Button onClick={() => setOpen(!open)}>Login</Button></Link>)
			}

		</div>
		{(open && user) && (
			<div className={style.dropdownPortal}>
				<ul className={style.dropdownMenu}>
					<div>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/products">Shop</Link></li>
						{/* <li><Link to="/about">About</Link></li> */}
						{/* <li><Link to="/contact">Contact</Link></li> */}
					</div>
					<li><Link to="/cart">Cart</Link></li>
					{/* <li><Link to="my-orders">My Orders</Link></li> */}
					<li><a onClick={handleLogout}>Sign out</a></li>
				</ul>
			</div>
		)}
	</>;
}
