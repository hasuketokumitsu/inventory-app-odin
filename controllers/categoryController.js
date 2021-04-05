var Category = require("../models/category");

// Display list of all categories.
exports.category_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Category list");
};

// Display detail page for a specific category.
exports.category_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Category detail: " + req.params.id);
};

// Display Category create form on GET.
exports.category_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Category create GET");
};
