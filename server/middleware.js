const jwt = require("jsonwebtoken");
const process = require("process");

function authorization(req, res, next) {
    console.log("auth middleware invoked")
    console.log(req.headers)
    const token = req.headers.authorization 

    console.log("extracted token:", token)
    if (!token) {
        return res.status(401).send("No token provided.");
    }

    try {
        const user = jwt.verify(token, process.env.JWT);
        req.user = user;
        console.log("middleware req.user", req.user)

        if (role === 'admin' && !user.admin) {
            return res.send(403).send("Access denied. Insufficient permissions.");
        }
        next();
    } catch (error) {
        console.log("Token verification error:", error.message);
        return res.status(403).send("Failed to authenticate token.")
    }
}

module.exports = authorization;

cartQuantity = 0;
