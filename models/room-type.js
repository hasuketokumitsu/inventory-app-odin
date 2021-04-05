var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Declare the schema
var RoomTypeSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  bathroomIncluded: { type: String, enum: ["Yes", "No"], default: "No" },
  maxNumberOfTenant: { type: Number },
  price: { type: Number },
  numberInStock: { type: Number },
  note: { type: String },
});

// Virtual for url
RoomTypeSchema.virtual("url").get(function () {
  return `/inventory/room-type/${this._id}`;
});

// Export model
module.exports = mongoose.model("RoomType", RoomTypeSchema);
