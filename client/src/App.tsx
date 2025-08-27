import { ToastProvider } from "./context/ToastProvider"
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

// import "./App.css";

function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</ToastProvider>
	)
}

export default App
