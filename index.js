var cors = require("cors");
const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./database/config");

const app = express();

app.use(cors())

dbConnection();

app.use( express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));
app.use("/api/statistics", require("./routes/statistics"));


app.listen( process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));