import { useToast } from "../context/ToastProvider";

export default function Toast() {
	const { toasts, deleteToast } = useToast();

	return (
		<div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
			{toasts.map((toast) => (
				<div
					key={toast.id}
					style={{
						padding: '10px 20px',
						marginBottom: '10px',
						borderRadius: '4px',
						color: '#fff',
						backgroundColor:
							toast.type === 'success' ? '#28a745' :
								toast.type === 'error' ? '#dc3545' : '#17a2b8',
						cursor: 'pointer',
					}}
					onClick={() => deleteToast(toast.id)} // Click to dismiss
				>
					{toast.message}
				</div>
			))}
		</div>
	);
}
