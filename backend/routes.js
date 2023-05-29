const { ObjectId } = require("bson");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const { auth } = require("./middleware");
let createBSONId = () => {
	return new ObjectId().toString();
};

let wrapper = (supabase) => {
	const router = require("express").Router();
	router.get("/getMessages", auth(supabase), async (req, res) => {
		const { data, error } = await supabase
			.from("messages")
			.select()
			.eq("to", req.user.username);
		if (error) {
			return res.status(500).send(error);
		}
		return res.json(data);
	});
	0;
	router.get("/getMessages/:from", auth(supabase), async (req, res) => {
		const { data, error } = await supabase
			.from("messages")
			.select()
			.eq("from", req.params.from)
			.eq("to", req.user.username);
		if (error) {
			return res.status(500).send(error);
		}
		return res.json(data);
	});

	router.post("/sendMessage", auth(supabase), async (req, res) => {
		const { error } = await supabase.from("messages").insert({
			message: req.body.message,
			from: req.user.username,
			to: req.body.to,
		});
		if (error) {
			return res.status(500).send(error);
		}
		return res.json({ message: "Successfully sent your message!" });
	});

	router.ws("/subscribeMessages", auth(supabase), (ws, req) => {
		supabase
			.channel("any")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "messages",
					filter: `to=eq.${req.user.username}`,
				},
				(payload) => {
					ws.send(JSON.stringify(payload.new));
				}
			)
			.subscribe();

		ws.on("message", (mes) => {
			ws.send(mes);
		});
	});

	router.ws("/subscribeMessagesFromAnUser", auth(supabase), (ws, req) => {
		supabase
			.channel("any")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "messages",
					filter: `to=eq.${req.user.username}from=eq.${req.query.from}`,
				},
				(payload) => {
					ws.send(JSON.stringify(payload.new));
				}
			)
			.subscribe();

		ws.on("message", (mes) => {
			ws.send(mes);
		});
	});

	router.post("/signup", async (req, res) => {
		let { data: user } = await supabase
			.from("users")
			.select()
			.or(`username.eq.${req.body.username},email.eq.${req.body.email}`);

		if (user !== []) {
			user = user[0];
			return res.status(403).json({
				message:
					user.username == req.body.username
						? "Username already exists!"
						: "Email already exists!",
			});
		}

		const _id = createBSONId();
		const { error } = await supabase.from("users").insert({
			_id: _id,
			username: req.body.username,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 10),
		});
		if (error) {
			return res.status(500).send(error);
		}

		let token = jwt.sign(
			{
				_id: _id,
				username: req.body.username,
				email: req.body.email,
			},
			JWT_SECRET
		);
		return res.json({
			message: "Successfully created new user!",
			_id: _id,
			username: req.body.username,
			email: req.body.email,
			token: token,
		});
	});
	router.post("/signin", async (req, res) => {
		let { data } = await supabase
			.from("users")
			.select()
			.eq("username", req.body.username);

		data = data["0"];
		if (!data) {
			return res.status(403).json({
				message: "Invalid Username!",
			});
		}

		let isMatch = await bcrypt.compare(req.body.password, data.password);
		if (!isMatch) {
			return res.status(403).json({
				message: "Invalid Password!",
			});
		}

		let token = jwt.sign(
			{
				_id: data._id,
				username: req.body.username,
				email: data.email,
			},
			JWT_SECRET
		);
		return res.json({
			message: "Successfully logged in!",
			_id: data._id,
			username: req.body.username,
			email: data.email,
			token,
		});
	});

	return router;
};

module.exports = wrapper;
