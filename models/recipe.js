const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//review schema
const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
  }, {
    timestamps: true
  });
//recipe Schema
const recipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    reviews: [reviewSchema],
    userId: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);