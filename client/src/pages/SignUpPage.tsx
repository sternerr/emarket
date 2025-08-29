import { useEffect } from "react";
import { useAuth, type User } from "../context/auth.context";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Form from "../components/Form";
import Button from "../components/basic/Button";
import Input from "../components/basic/Input";
import { useToast } from "../context/ToastProvider";
import Footer from "../components/Footer";

export default function SignUpPage() {
	const { showToast } = useToast();
	const { user, setUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user])

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const formData = new FormData(e.currentTarget)
			if (formData.get("password") !== formData.get("repassword")) {
				const error = new Error();
				error.message = "password do not match"
				throw error;
			}

			const body = {
				email: formData.get("email"),
				password: formData.get("password")
			}

			if (body.email === "" || body.password === "") {
				const error = new Error();
				error.message = "invalid username or password"
				throw error;
			}

			const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/v1/auth/sign-up`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body)
			})

			if (!response.ok) {
				const data = await response.json()
				const error = new Error();
				error.message = data.message;
				throw error;
			}

			const data = await response.json()
			const user: User = {
				token: data.data.token,
				id: data.data.user.id
			};

			setUser(user);
		} catch (error: any) {
			showToast(error.message, "error");
		}
	}

	return (
		<main className="fullscreen center">
			<Form onSubmit={handleSubmit}>
				<Input type="email" placeholder="Email" name="email" />
				<Input type="password" placeholder="Password" name="password" />
				<Input type="password" placeholder="Reenter password" name="repassword" />
				<Button type="submit">Sign up</Button>
				<span>Have an account? <u><Link to="/sign-in">sign-in</Link></u></span>
			</Form>
		</main >
	);
}
