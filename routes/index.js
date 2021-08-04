const express = require('express');
const router = express.Router();
const passport = require("passport");

// Google OAuth login route
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  
// router.get('/', function(req, res, next) {
//   res.render('index');
// });


// Google OAuth callback route
router.get(
    "/oauth2callback",
    passport.authenticate("google", {
      successRedirect: "/",  //routing to /index
      failureRedirect: "/",
    })
  );


// OAuth logout route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  router.get("/", function (req, res) {
    res.render("index", {
      user: req.user,
    });
  });
  
module.exports = router;