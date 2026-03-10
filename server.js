require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

const app = express();

/* CONNECT DATABASE */
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});