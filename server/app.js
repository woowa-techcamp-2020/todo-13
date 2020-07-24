require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const errHandler = require("./error");
const port = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("combined"));
app.use(cookieParser());

const apiRouter = require("./routes/api-router");

app.use("/api", apiRouter);

app.get("/", (req, res) =>
  res.sendFile("public/index.html", { root: __dirname })
);

// logger
app.use(errHandler.logErrors);

// send response
app.use(errHandler.sendErrors)

app.listen(port, () =>
  console.log(`Example app listening at: ${port}`)
);
