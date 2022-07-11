const {Router} = require("express");
const checkRoleMiddleware = require('./../middlewares/checkRole-middleware')
const userController = require('./../controllers/user-controller')

const router = Router()

router.get('/users', checkRoleMiddleware('ADMIN'), userController.getUsers)

module.exports = router