const express = require("express")
const router = express.Router()

const wrapasync = require("../utils/wrapasync.js")
const passport = require("passport")
const { saveRedirecturl } = require("../middleware.js")
const { singup, login, logout } = require("../controllers/user.js")

router.route("/signup")
    .get((req, res) => {
        res.render("users/signup.ejs")
    })
    .post(wrapasync(singup))


const authenticate = passport.authenticate("local", {      // middleware for login checkup
    failureRedirect: "/login",
    failureFlash: true
})


router.route("/login")
    .get((req, res) => {
        res.render("users/login.ejs")
    })
    .post(saveRedirecturl, authenticate, login)




router.get("/logout", logout)

module.exports = router 