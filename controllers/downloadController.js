const downloads = require("../models/downloadModel");

exports.addToDownload = async (req,res)=>{
    console.log("Inside add to download");
    const {id} = req.params
    const userMail = req.payload
    const {name,cuisine,image} = req.body

    try {
        const existingRecipe = await downloads.findOne({recipeId:id})
        if(existingRecipe){

            existingRecipe.count+=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else{
            const newDownload = new downloads({
                recipeId:id,recipeName:name,recipeImg:image,recipeCuisine:cuisine,count:1,userMail
            })
            await newDownload.save()
             res.status(200).json(newDownload)

        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}