const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

const port = process.env.PORT || 4000;
const app = express();
require("dotenv").config();
require("./config/database");
require("./config/passport")


//////////////
const indexRouter = require("./routes/index");
const recipeRouter = require("./routes/recipes");
// We'll need to load the env vars


///////////////


// view engine setup
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride('_method'));
//session middleware
app.use(
    session({
      //secret: process.env.SECRET,
      secret: "COMMUNITY-BITES!",
      resave: false,
      saveUninitialized: true,
    })
  );

//passport initialise
app.use(passport.initialize());
app.use(passport.session());

//paths
app.use("/", indexRouter);
app.use("/recipes", recipeRouter);


//server
app.listen(port, () => {
	console.log(`Express is listening on port:${port}`);
});
