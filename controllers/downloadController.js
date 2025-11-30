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

exports.getUserDownloadList = async(req,res)=>{
    console.log("Inside get user download list");
    const userMail = req.payload
    try {
        const allUserDownloadList = await downloads.find({userMail})
        res.status(200).json(allUserDownloadList)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

exports.getDownloadList = async(req,res)=>{
    console.log("Iniside get Download List");
    try {
        const allDownload = await downloads.find()
        res.status(200).json(allDownload)
        
    } catch (err) {
        res.status(500).json(error)
    }
    
}