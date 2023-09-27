function authorization(req,res,next) {
    const token = window.sessionStorage.getItem("credentials");

    if (!token) {
        next()
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT)
        req.user = user
        next()
        return
    } catch (error) {
        console.error(error);
        next()
        return
    }
}

module.exports = authorization;
