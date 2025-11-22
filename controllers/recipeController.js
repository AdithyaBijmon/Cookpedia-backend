// get all recipes

const recipes = require("../models/recipeModel");

exports.getAllRecipes = async(req,res)=>{
    console.log('Inside get All Recipes');

    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)

    }
    catch(err){
        res.status(500).json(err)
    }
    
}