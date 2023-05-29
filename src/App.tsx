import { Form, Button, Tab, Row, Nav, Col } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import { baseUrl, Toast } from "./config";
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";

function App() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useLocalStorage(
		"token",
		localStorage.getItem("token")
	);

	const signUp = async () => {
		await axios
			.post(`${baseUrl}/signup`, {
				username: username,
				email: email,
				password: password,
			})
			.then((response) => {
				setToken(response.data.token);
				console.log(response.data.message);
				Toast.fire({
					icon: "success",
					title: response.data.message,
				});
			})
			.catch((error) => {
				console.log(error);
				let { response } = error;
				Toast.fire({
					icon: "error",
					title: response?.data?.message ?? error.message,
				});
			});
	};
	const signIn = async () => {
		await axios
			.post(`${baseUrl}/signin`, {
				username: username,
				password: password,
			})
			.then((response) => {
				setToken(response.data.token);
				console.log(response.data.message);
				Toast.fire({
					icon: "success",
					title: response.data.message,
				});
			})
			.catch((error) => {
				console.log(error);
				let { response } = error;
				Toast.fire({
					icon: "error",
					title: response?.data?.message ?? error.message,
				});
			});
	};

	return (
		<>
			{" "}
			{!token ? (
				<div className="card">
					<Tab.Container
						id="left-tabs-example"
						defaultActiveKey="first"
					>
						<Row>
							<Col sm={3}>
								<Nav variant="pills" className="tab-link">
									<Nav.Item>
										<Nav.Link eventKey="first">
											Sign Up
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">
											Sign In
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey="first">
										{/* <Form> */}
										<h1 className="text-center">Sign Up</h1>
										<p className="text-center">
											Welcome To Learn React Vite!
										</p>
										<Form.Group className="form-input mb-3">
											<Form.Label>Username</Form.Label>
											<Form.Control
												name="username"
												type="text"
												onChange={(e) =>
													setUsername(e.target.value)
												}
												value={username}
											/>
										</Form.Group>
										<Form.Group className="form-input mb-3">
											<Form.Label>Email</Form.Label>
											<Form.Control
												name="email"
												type="text"
												onChange={(e) =>
													setEmail(e.target.value)
												}
												value={email}
											/>
										</Form.Group>
										<Form.Group className="form-input mb-3">
											<Form.Label>Password</Form.Label>
											<Form.Control
												name="password"
												type="password"
												onChange={(e) =>
													setPassword(e.target.value)
												}
												value={password}
											/>
										</Form.Group>
										<Form.Group className="form-input mb-3">
											<Button
												type="submit"
												onClick={signUp}
											>
												Sign Up
											</Button>
										</Form.Group>
										{/* </Form> */}
									</Tab.Pane>
									<Tab.Pane eventKey="second">
										<h1 className="text-center">Sign In</h1>
										<p className="text-center">
											Welcome back!
										</p>
										{/* <Form> */}
										<Form.Group className="form-input mb-3">
											<Form.Label>Username</Form.Label>
											<Form.Control
												name="username"
												type="text"
												onChange={(e) =>
													setUsername(e.target.value)
												}
												value={username}
											/>
										</Form.Group>
										<Form.Group className="form-input mb-3">
											<Form.Label>Password</Form.Label>
											<Form.Control
												name="password"
												type="password"
												onChange={(e) =>
													setPassword(e.target.value)
												}
												value={password}
											/>
										</Form.Group>
										<Form.Group className="form-input mb-3">
											<Button
												type="submit"
												onClick={signIn}
											>
												Sign In
											</Button>
										</Form.Group>
										{/* </Form> */}
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</div>
			) : (
				<div className="container">
					{" "}
					<h1 className="text-center">
						{" "}
						Welcome To Learn React Vite (aka Learn React Fast),{" "}
					</h1>
					<h3 className="text-center">
						a small react project I made while learning React.
					</h3>
				</div>
			)}
		</>
	);
}

export default App;
