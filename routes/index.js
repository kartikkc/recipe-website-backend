const express = require("express");
const router = express.Router();
const recipes = require("./recipe.route");
const authroute = require("./user.route");

router.use("/recipe", recipes);
router.use("/auth", authroute);

module.exports = router;