const express = require('express')
const { getAllRecipes } = require('../controllers/recipeController')
const { registerController, loginController } = require('../controllers/userController')

const routes = express.Router()

routes.get('/all-recipes',getAllRecipes)
routes.post('/register',registerController)
routes.post('/login',loginController)


module.exports = routes