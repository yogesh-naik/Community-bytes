const Recipe = require("../models/recipe");

module.exports = {
	create,
	findRecipe,
	showAll,
	addReview,
	deleteRecipe,
	editRecipe,
	updateRecipe,
};

function create(req, res) {
	// console.log("1"+req.user);
	// console.log("2"+req.params.id);
	const recipe = new Recipe(req.body);
	console.log(recipe);
	recipe.userId.push(req.user);
	recipe.save(function (err) {
		if (err) { 
			// add alert later TBD
			return res.redirect("/recipes/new");
		}
		console.log(recipe);
		res.redirect(`/`);
	});
}


function findRecipe(req, res) {
	//console.log("Recipe name--> "+req.query.recipeName);
	Recipe.find({ recipeName: req.query.recipeName }, function (err, recipe) {
		res.render("recipes/find", {
			title: "Add Performer",
			recipe,
			user: req.user,
		});
	});
}

//Show All receipes
function showAll(req, res) {
	//console.log("Recipe name--> "+req.query.recipeName);
	Recipe.find({}, function (err, recipe) {
		res.render("recipes/show", {
			user: req.user,
			recipe,
		  });
	});
}


//Add Review method
function addReview(req, res) {
	//console.log("Recipe name--> "+req.query.recipeName);
	Recipe.find({ recipeName: req.query.recipeName }, function (err, recipe) {
		recipe[0].reviews.push(req.body);
		recipe[0].save(function (err) {
			res.render("recipes/find", {
				title: "Add Performer",
				recipe,
				user: req.user,
			 //**TBD find root cause
			});
		});
	});
}

// Delete Recipe Method
function deleteRecipe(req, res) {
	Recipe.findByIdAndDelete(req.params.id, function (err, recipe) {
		res.redirect('/recipes/show');
	});
};

// Edit Recipe
function editRecipe(req, res) {
	Recipe.findById(req.params.id, function(err, recipe) {
		res.render("recipes/edit",{
			user: req.user,
			recipe });
	});
};

// Update Recipe
function updateRecipe(req, res) {
	console.log(`This is req.body:`, req.body.steps);
	if (req.body.steps != "") {
		Recipe.findByIdAndUpdate(req.params.id, req.body, function (err) {
			res.redirect('/recipes/show');
		});
	}
	else {
		res.redirect('/recipes/show');
	}
};