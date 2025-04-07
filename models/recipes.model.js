const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
        unique: true
    },
    ingredient:{
        type: String,
        required: true,
    },
    process:{
        type: String,
        required: true
    },
    image:{
        type: String,
    }
});


module.exports = mongoose.model("Recipe", RecipeSchema);