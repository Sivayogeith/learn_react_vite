import { useLocalStorage } from "usehooks-ts";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Header.css";

function Header() {
	const [token, setToken] = useLocalStorage(
		"token",
		localStorage.getItem("token")
	);

	return (
		<main>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="/">Learn React Vite</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar" />
					<Navbar.Collapse id="navbar">
						<Nav className="me-auto">
							<Nav.Link href="/messages">Messages</Nav.Link>
						</Nav>
						{token ? (
							<Nav className="me-auto">
								{" "}
								<Button
									onClick={() => {
										setToken("");
									}}
								>
									Log Out
								</Button>
							</Nav>
						) : null}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</main>
	);
}

export default Header;
