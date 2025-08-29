import { type ButtonHTMLAttributes, type ReactNode } from "react"

type ButtonProps = {
	children: ReactNode,
	variant?: "primary" | "secondary",
	design?: "filled" | "outlined"
} & ButtonHTMLAttributes<HTMLButtonElement>;

import style from "../../assets/css/basic/button.module.css";

export default function Button({ children, variant, design, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={
				[
					style.button,
					style[variant ?? "primary"],
					style[design ?? "filled"]
				].join(" ")
			}
		>{children}</button>
	);
}
