import { ToastProvider } from "./context/ToastProvider"
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

// import "./App.css";

function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/shop" element={<ShopPage />} />
				</Routes>
			</BrowserRouter>
		</ToastProvider>
	)
}

export default App
