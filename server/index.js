const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const jwt = require("jsonwebtoken")
const ViteExpress = require("vite-express")

const cors = require('cors');

//Use Cors
app.use(cors());

//Serve Static files
app.use(express.static(path.join(__dirname, "..", "dist")));

//Parse incoming requests with JSON payloads
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", require('./api'))
app.use("/auth", require("./auth"))


const server = app.listen(PORT, ()=>{
    console.log('Server running on port'+PORT)
})
ViteExpress.bind(app,server)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
});
