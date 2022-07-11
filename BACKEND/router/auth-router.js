const {Router} = require("express");
const {check} = require("express-validator");
const authController = require("./../controllers/auth-controller");
const AuthMiddleware = require("./../middlewares/auth-middleware");

const router = Router()


router.post('/registration', [
    check('email', 'email is not correct').isEmail(),
    check('password', 'password length must be from 5 to 15 ')
        .isLength({min: 5, max: 15})
], authController.registration)
router.get('/registrationAdmin', authController.registrationAdmin)
router.post('/login', authController.login)
router.post('/logout', AuthMiddleware, authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)

module.exports = router