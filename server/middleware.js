const jwt = require("jsonwebtoken");
const process = require("process");

function authorization(req, res, next) {
    const token = req.headers.authorization; 

    if (!token) {
        next();
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        next();
    }
}

module.exports = authorization;