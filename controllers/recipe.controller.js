const Recipe = require("../models/recipes.model");


async function getAllRecipes(req, res) {
    try {
        const allrecipes = await Recipe.find();
        return res.status(200).json(allrecipes);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

async function addRecipe(req, res) {
    try {
        const { name, ingredient, process } = req.body;
        const recipeFound = await Recipe.findOne({ name: name });
        if (recipeFound) {
            return res.status(403).json("Already Exists");
        }
        else if (!recipeFound) {
            const newRecipe = new Recipe({
                name: name,
                ingredient: ingredient,
                process: process,
            });
            await newRecipe.save();
            return res.status(201).json("Recipe Saved Successfully");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

async function deleteRecipe(req, res) {
    try {
        const { id } = req.params;
        const recipeFound = await Recipe.findById(id);
        if (recipeFound) {
            await Recipe.findByIdAndDelete(id);
            return res.status(200).json("Recipe Removed Succesfully");
        }
        else {
            return res.status(404).json("Recipe Not Found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

async function updateRecipe(req, res) {
    try {
        const { id } = req.params;
        const { name, ingredient, process, newName } = req.body;
        const findRecipe = await Recipe.findById(id);
        if (findRecipe) {
            const updatedRecipe = new Recipe({
                _id: findRecipe._id,
                name: newName,
                ingredient: findRecipe.ingredient + ingredient,
                process: findRecipe.process + process,
            });
            await Recipe.findByIdAndUpdate(findRecipe._id, { $set: updatedRecipe }, { new: true });
            return res.status(200).json("Recipe Updated Sucessfully");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }
};

module.exports = {
    getAllRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe
}