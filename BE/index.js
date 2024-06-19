const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const auth = require("./routes/auth");
const quiz = require("./routes/quiz");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors({
  origin:["09nantha10-gmail-com-cuvette-final-evaluation-september.vercel.app"],
  methods:["POST","GET","PUT","DELETE"]
}));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Db connected"))
  .catch((error) => console.log(error));

app.use("/api/v1/auth", auth);
app.use("/api/v1/quiz", quiz);

app.use("/*", (req, res) => {
  res.status(404).json({ errorMessage: "Route not found" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});