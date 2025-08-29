import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type User = {
	id: string;
	token: string;
}

type AuthContextType = {
	user: User | undefined;
	setUser: (user: User) => void;
	logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | undefined>(
		localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!)
			: undefined
	)

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user))
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	const logout = () => {
		setUser(undefined)
	}

	return (
		<AuthContext.Provider value={{ user, setUser, logout }} >
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}

	return context;
}
