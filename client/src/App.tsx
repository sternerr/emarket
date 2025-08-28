import { ToastProvider } from "./context/ToastProvider"
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Toast from "./components/Toast";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { AuthProvider } from "./context/auth.context";
import { CartProvider } from "./context/CartProvider";
function App() {
	return (
		<ToastProvider>
			<Toast />
			<AuthProvider>
				<CartProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/products" element={<ShopPage />} />
							<Route path="/products/:id" element={<ProductPage />} />
							<Route path="/cart" element={<CartPage />} />

							<Route path="/sign-in" element={<LoginPage />} />
							<Route path="/sign-up" element={<SignUpPage />} />
						</Routes>
					</BrowserRouter>
				</CartProvider>
			</AuthProvider>
		</ToastProvider>
	)
}

export default App
