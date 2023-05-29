import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Messages from "./Messages/Messages";
import Header from "./Header/Header";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/messages",
		element: <Messages />,
	},
]);
ReactDOM.createRoot(document.querySelector("body") as HTMLElement).render(
	<React.StrictMode>
		<Header />
		<RouterProvider router={router} />
	</React.StrictMode>
);
