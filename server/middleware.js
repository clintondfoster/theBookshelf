const jwt = require("jsonwebtoken");
const process = require("process");

function authorization(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send("No token provided.");
    }

    try {
        const user = jwt.verify(token, process.env.JWT);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).send("Failed to authenticate token.")
    }
}

module.exports = authorization;