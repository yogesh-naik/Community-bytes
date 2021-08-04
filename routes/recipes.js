const express = require('express');
const router = express.Router();

const recipeCtrl = require('../controllers/recipes')



//Router paths
router.post("/", isLoggedIn, recipeCtrl.create);
router.get("/display", isLoggedIn, recipeCtrl.findRecipe);
router.get("/show", isLoggedIn, recipeCtrl.showAll);
//for Reviews
router.post("/display", isLoggedIn, recipeCtrl.addReview);

router.get('/new', isLoggedIn, function (req, res, next) {
    res.render('recipes/new', {
        user: req.user,
      });
});

router.get('/find', isLoggedIn, function (req, res, next) {
    res.render('recipes/find', { 
        recipe: false,
        user: req.user,
    });
});

router.delete('/:id', isLoggedIn, recipeCtrl.deleteRecipe);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
};

router.get('/:id', isLoggedIn, recipeCtrl.editRecipe);

router.put('/:id', recipeCtrl.updateRecipe);

module.exports = router;