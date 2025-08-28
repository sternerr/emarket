import { useEffect } from "react";
import { useAuth, type User } from "../context/auth.context";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Form from "../components/Form";
import { useToast } from "../context/ToastProvider";

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
				<input type="email" placeholder="Email" name="email" />
				<input type="password" placeholder="Password" name="password" />
				<input type="password" placeholder="Reenter password" name="repassword" />
				<button type="submit">Sign up</button>
				<span>Have an account? <Link to="/sign-in">sign-in</Link></span>
			</Form>
		</main >
	);
}
