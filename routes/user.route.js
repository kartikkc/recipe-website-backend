const express = require("express");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const { fetchuser, isAdmin } = require("../middleware/auth.middleware");
const { addUser, userLogin, removeUser } = require("../controllers/auth.controller");
const router = express.Router();


router.post("/register", async (req, res) => { addUser(req, res) });
router.post("/login", async (req, res) => { userLogin(req, res) });
router.post("/remove_user", fetchuser, isAdmin, async (req, res) => { removeUser(req, res) });








module.exports = router;