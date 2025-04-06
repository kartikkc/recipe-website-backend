const express = require("express");
const { fetchuser, isAdmin } = require("../middleware/auth.middleware");
const { getAllRecipes, addRecipe, deleteRecipe, updateRecipe } = require("../controllers/recipe.controller");
const router = express.Router();

router.get("/all", fetchuser, async (req, res) => { getAllRecipes(req, res) });
router.get("/:id", fetchuser, isAdmin, async (req, res) => { getOneRecipe(req, res) });
router.post("/add", fetchuser, isAdmin, async (req, res) => { addRecipe(req, res) });
router.delete("/delete/:id", fetchuser, isAdmin, async (req, res) => { deleteRecipe(req, res) });
router.put("/update/:id", fetchuser, isAdmin, async (req, res) => { updateRecipe(req, res) });

module.exports = router;