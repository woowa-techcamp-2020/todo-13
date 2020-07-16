require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cardRouter = require('./routes/cardRouter')

app.get("/", (req, res) => res.send("Hello World! Docker setup done~~~"));
app.use("/card", cardRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
