const express = require('express')
const { getAllRecipes, viewRecipe, getRelatedRecipes } = require('../controllers/recipeController')
const { registerController, loginController, updateUser } = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const { addToDownload, getUserDownloadList } = require('../controllers/downloadController')
const { addToCollection, getSavedRecipes, deleteSavedRecipe } = require('../controllers/saveController')

const routes = express.Router()

routes.get('/all-recipes',getAllRecipes)
routes.post('/register',registerController)
routes.post('/login',loginController)
routes.get('/view/:id/recipe',jwtMiddleware,viewRecipe)
routes.get('/related-recipes',jwtMiddleware,getRelatedRecipes)
routes.put('/recipe/:id/download',jwtMiddleware,addToDownload)
routes.post('/recipe/:id/save',jwtMiddleware,addToCollection)
routes.get('/recipes/saved',jwtMiddleware,getSavedRecipes)
routes.delete('/recipe/:id/remove',jwtMiddleware,deleteSavedRecipe)

routes.get('/recipes/user/download',jwtMiddleware,getUserDownloadList)

routes.post('/user/:id/edit',jwtMiddleware,updateUser)

module.exports = routes