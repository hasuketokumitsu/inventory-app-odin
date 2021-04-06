var express = require("express");
var router = express.Router();

// Require controller modules
var roomTypeController = require("../controllers/roomTypeController");
var categoryController = require("../controllers/categoryController");

/// ROOM TYPE ROUTES

// GET request for creating a room type. This must come before routes that display room types (uses id).
router.get("/room-type/create", roomTypeController.room_type_create_get);

// POST request for creating room type.
router.post("/room-type/create", roomTypeController.room_type_create_post);

// GET request to delete room type.
router.get("/room-type/:id/delete", roomTypeController.room_type_delete_get);

// POST request to delete room type.
router.post("/room-type/:id/delete", roomTypeController.room_type_delete_post);

// GET request to update room type.
router.get("/room-type/:id/update", roomTypeController.room_type_update_get);

// POST request to update room type.
router.post("/room-type/:id/update", roomTypeController.room_type_update_post);

// GET request for one room type.
router.get("/room-type/:id", roomTypeController.room_type_detail);

// GET request for list of all room types.
router.get("/room-type", roomTypeController.room_type_list);

/// CATEGORY ROUTES

// GET inventory home page.
router.get("/", categoryController.index);

// GET request for creating a category. This must come before routes that display room types (uses id).
router.get("/category/create", categoryController.category_create_get);

// POST request for creating a category.
router.post("/category/create", categoryController.category_create_post);

// GET request to delete a category.
router.get("/category/:id/delete", categoryController.category_delete_get);

// POST request to delete a category.
router.post("/category/:id/delete", categoryController.category_delete_post);

// GET request to update a category.
router.get("/category/:id/update", categoryController.category_update_get);

// POST request to update a category.
router.post("/category/:id/update", categoryController.category_update_post);

// GET request for the details of one category.
router.get("/category/:id", categoryController.category_detail);

// GET request for list of all categories.
router.get("/category", categoryController.category_list);

module.exports = router;
