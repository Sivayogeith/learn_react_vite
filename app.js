const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const { createClient } = require("@supabase/supabase-js");
const { supabaseKey, supabaseUrl, PORT } = require("./backend/config");
const router = require("./backend/routes");
const cors = require("cors");

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());
app.use(
	"/api/v1/",
	(req, res, next) => {
		req.supabase = supabase;
		next();
	},
	router(supabase)
);

app.listen(PORT, () => {
	console.log(`Server listening at ${PORT}`);
});
