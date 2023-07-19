const jwt = require("jsonwebtoken");

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const access_token = token.split(" ")[1];
            jwt.verify(access_token, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You're not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            console.log('req:', req.user.id)
            console.log('req:', req.user.role)
            if (req.user.id === req.params.id || req.user.role === "ADMIN") {
                next();
            } else {
                res.status(403).json("You're not allowed to delete other")
            }
        });
    }
}

module.exports = middlewareController;