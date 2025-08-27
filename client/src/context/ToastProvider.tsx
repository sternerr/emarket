import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type Toast = {
	id: string;
	message: string;
	type: "success" | "error" | "info";
	duration: number;
}

type ToastContextType = {
	toasts: Toast[];
	showToast: (message: string, type: Toast["type"], duration?: number) => void;
	deleteToast: (id: string) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const deleteToast = useCallback((id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	const showToast = useCallback((message: string, type: Toast["type"] = "info", duration: number = 5000) => {
		const id = Math.random().toString(36);
		const toast: Toast = { id, message, type, duration };

		setToasts(prev => [...prev, toast]);

		setTimeout(() => {
			deleteToast(id);
		}, duration);
	}, []);

	return (
		<ToastContext.Provider value={{ toasts, deleteToast, showToast }} >
			{children}
		</ToastContext.Provider>
	)
}

export function useToast() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}

	return context;
}
