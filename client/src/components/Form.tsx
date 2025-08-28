import { type ReactNode } from "react";

export default function Form({ children, onSubmit }: { children: ReactNode, onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void }) {
	return (
		<form
			className="block--form"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "8px",

			}}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
}
