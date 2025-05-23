require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Getting the user from JWT and append the id to the req object
    const token = req.header("authToken");
    if (!token) {
        // res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

const isAdmin = async (req, res, next) => {
    const token = req.header("authToken");
    try {
        const data = jwt.verify(token, JWT_SECRET);
        if (!data.user.admin) {
            return res.status(403).json("Access Denied. Admins Only");
        }
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = { fetchuser, isAdmin };
