import type { ReactNode } from "react";

import styles from "../assets/css/productGrid.module.css";

export default function ProductGrid({ children, length, scrollable = false }: { children: ReactNode, length: number, scrollable?: boolean }) {
	return (
		<div
			className={`${styles.grid} ${scrollable ? styles.scrollable : ''}`}
			style={{ '--grid-columns': length } as React.CSSProperties}
		>
			{children}
		</div>
	);
}
