import Header from "./components/Header";
import { ToastProvider, useToast } from "./context/ToastProvider"
import Toast from "./components/Toast";

// import "./App.css";

function App() {
	return (
		<ToastProvider>
			<Header />
			<Toast />
			<ShowToast />
		</ToastProvider>
	)
}

function ShowToast() {
	const { showToast } = useToast();

	const handleClick = () => {
		showToast("Operation successful!", "success", 3000);
		showToast("Something went wrong", "error");
		showToast("Just a heads up!", "info", 2000);
	};

	return <button onClick={() => handleClick()}>Show Toast</button>;
}

export default App
