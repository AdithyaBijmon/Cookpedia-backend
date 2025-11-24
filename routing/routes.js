const express = require('express')
const { getAllRecipes, viewRecipe, getRelatedRecipes } = require('../controllers/recipeController')
const { registerController, loginController } = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const routes = express.Router()

routes.get('/all-recipes',getAllRecipes)
routes.post('/register',registerController)
routes.post('/login',loginController)
routes.get('/view/:id/recipe',jwtMiddleware,viewRecipe)
routes.get('/related-recipes',jwtMiddleware,getRelatedRecipes)


module.exports = routes