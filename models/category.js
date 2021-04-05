var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Declare the schema
var CategorySchema = new Schema({
  name: {
    type: String,
    enum: ["Double Rooms", "Single Rooms", "Dorms"],
    required: true,
  },
  note: { type: String },
});

// Virtual for url
CategorySchema.virtual("url").get(function () {
  return `/inventory/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);
