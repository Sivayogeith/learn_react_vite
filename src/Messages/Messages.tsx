import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Messages.css";

interface Message {
	userClass: string;
	mes: string;
}

const DEFAULT_MESSAGES: Message[] = [
	{
		userClass: "their-mes",
		mes: "Hi",
	},
];

function Messages() {
	const [messages, setMessages] = useState(DEFAULT_MESSAGES);
	let [message, setMessage] = useState("");
	let [scrlToBtm, setScrlToBtm] = useState(true);
	let chat: Element = document.querySelector(".chat");
	const sendMessage = async () => {
		if (message) {
			await setMessages((oldArray) => [
				...oldArray,
				{
					userClass: "my-mes",
					mes: message,
				},
			]);
			setMessage("");
			if (scrlToBtm) {
				chat.scrollTop = chat.scrollHeight;
			}
		}
	};
	return (
		<>
			<div className="container card">
				<div className="row">
					<div className="col-md-12 chat">
						{messages.map((message: Message) => (
							<p className={message.userClass}>{message.mes}</p>
						))}
					</div>
					<div className="col-md-10">
						<Form.Control
							type="text"
							onChange={(e: any) => {
								setMessage(e.target.value);
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									sendMessage();
								}
							}}
							value={message}
						/>
					</div>
					<div className="col-md-2">
						<Button variant="primary" onClick={sendMessage}>
							Send!
						</Button>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<Form.Check
							type="checkbox"
							label="Scroll To Bottom"
							onChange={(e: any) => {
								setScrlToBtm(e.target.checked);
							}}
							checked={scrlToBtm}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Messages;
