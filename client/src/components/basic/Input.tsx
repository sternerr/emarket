import { type InputHTMLAttributes } from "react"

type InputProps = {
} & InputHTMLAttributes<HTMLInputElement>;

import style from "../../assets/css/basic/input.module.css";

export default function Button({ ...props }: InputProps) {
	return (
		<input
			{...props}
			className={
				style.input
			}
		/>
	);
}
