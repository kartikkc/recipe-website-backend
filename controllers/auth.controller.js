require("dotenv").config();
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;
async function addUser(req, res) {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username: username });
        if (!findUser) {
            if (username == process.env.ADMIN_USER) {
                const createUser = new User({
                    username: process.env.ADMIN_USER,
                    password: process.env.ADMIN_PASS,
                    admin: true
                });
                await createUser.save();
                return res.status(200).json("Admin User Created");
            }
            else {
                const createUser = new User({
                    username: username,
                    password: password,
                });
                await createUser.save();
                return res.status(201).json("User Created Successfully");
            }
        }
        else {
            return res.status(403).json("User Exists Already Login");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
};

async function removeUser(req, res) {
    try {
        const { username } = req.body;
        const findUser = await User.findOne({ username: username });
        if (!findUser) {
            return res.status(404).json("User not found");
        }
        else {
            await User.findOneAndDelete({ usrename: username });
            return res.status(200).json("User Removed Successfully");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
};

async function userLogin(req, res) {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username: username });
        if (!findUser) {
            return res.status(404).json("User not found, Please Register");
        }
        else {
            if (findUser.username == process.env.ADMIN_USER) {
                const data = {
                    user: {
                        id: findUser._id,
                        username: username,
                        admin: findUser.admin,
                    }
                }
                const authToken = await jwt.sign(data, JWT_SECRET);
                return res.status(200).json(authToken);
            }
            else if (await bcrypt.compare(password, findUser.password)) {
                const data = {
                    user: {
                        id: findUser._id,
                        username: username,
                    }
                }
                const authToken = await jwt.sign(data, JWT_SECRET);
                return res.status(200).json(authToken);
            }
            else {
                return res.status(403).json("Password is Incorrect");
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
};



module.exports = {
    addUser,
    removeUser,
    userLogin,
};