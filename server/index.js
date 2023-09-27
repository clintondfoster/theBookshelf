const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const jwt = require("jsonwebtoken")
const authorization = require("./middleware");

const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "dist")));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api", authorization, require('./api'))
app.use("/auth", require("./auth"))


app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
})

app.listen(PORT, ()=>{
    console.log('Server running on port'+PORT)
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
});
