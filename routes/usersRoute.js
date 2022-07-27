const { Router } = require('express')
const route = Router()
const { getUsers, createUser} = require('../controllers/userController')
const { body } = require('express-validator')
const { emailVal } = require('../helpers/validations')
const { jwtValidator } = require('../middlewares/jwtValidation')

route.get('/',jwtValidator ,getUsers)

route.post(
  '/',
  body('email').not().isEmpty().withMessage("El campo email es requerido").isEmail().withMessage("el formato es incorrecto").custom(emailVal),
  body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).withMessage("ls contraseña no cumple los requisitos")
,createUser)

module.exports = route
