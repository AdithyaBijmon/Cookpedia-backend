const saveRecipes = require("../models/saveRecipesModel");

// add to collection
exports.addToCollection = async (req, res) => {
    console.log("Inside add to collection");

    const { name, image } = req.body
    const { id } = req.params
    const userMail = req.payload
    try {
        const existingRecipe = await saveRecipes.findOne({ recipeId: id, userMail })

        if (existingRecipe) {
            res.status(409).json("You already saved this recipe in your collection.")
        }
        else {
            const newRecipe = new saveRecipes({
                recipeId: id, recipeName: name, recipeImg: image, userMail
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

    }
    catch (err) {
        res.status(500).json(err)
    }

}

// get all saved recipes
exports.getSavedRecipes = async (req,res)=>{
    console.log("Inside get Saved Recipes");
    const userMail = req.payload
    try {
        const allSavedRecipes = await saveRecipes.find({userMail})
        res.status(200).json(allSavedRecipes)
    } catch (err) {
        res.status(500).json(err)
    }
    
}

exports.deleteSavedRecipe = async(req,res)=>{
    console.log("Inside remove Saved Recipe");
    const {id} = req.params
    try{
        const deleteRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(deleteRecipe)

    }
    catch(err){
        res.status(500).json(err)
    }
    
}