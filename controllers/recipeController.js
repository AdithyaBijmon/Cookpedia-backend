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

exports.viewRecipe = async(req,res)=>{
    console.log('Inside get a Recipes');
    const {id} = req.params

    try{
        const viewDetails = await recipes.findById({_id:id})
        res.status(200).json(viewDetails)

    }
    catch(err){
        res.status(500).json(err)
    }
    
}

exports.getRelatedRecipes = async(req,res)=>{
    console.log('Inside get related recipes');
    const cuisine = req.query.cuisine

    try{
        const viewAllRelatedRecipes = await recipes.find({cuisine})
        res.status(200).json(viewAllRelatedRecipes)

    }
    catch(err){
        res.status(500).json(err)
    }
    
}



