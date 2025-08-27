import { ToastProvider } from "./context/ToastProvider"
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./context/CartProvider";

// import "./App.css";

function App() {
	return (
		<ToastProvider>
			<CartProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/products" element={<ShopPage />} />
						<Route path="/products/:id" element={<ProductPage />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</ToastProvider>
	)
}

export default App
