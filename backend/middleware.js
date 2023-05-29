const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const auth = (supabase) => {
	return async (req, res, next) => {
		const authHeader = req.headers["authorization"];
		if (!authHeader) {
			return res
				.status(403)
				.json({ message: "Please provide Auth header!" });
		}
		const user = jwt.verify(authHeader, JWT_SECRET);
		if (user && user._id && user.username) {
			let { data, error } = await supabase
				.from("users")
				.select()
				.eq("_id", user._id);

			data = data[0];
			if (data && data.username == user.username) {
				req.user = user;
				return next();
			}
		}
		return res.status(403).json({ message: "The given token is invaild!" });
	};
};
module.exports = { auth };
