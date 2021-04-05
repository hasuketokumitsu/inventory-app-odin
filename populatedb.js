#! /usr/bin/env node

console.log(
  "This script populates some test room types and room categories to your database"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var RoomType = require("./models/room-type");
var Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var roomTypes = [];
var categories = [];

function roomTypeCreate(
  name,
  category,
  bathroomIncluded,
  maxNumberOfTenants,
  price,
  numberInStock,
  note,
  callback
) {
  roomTypeDetails = {
    name: name,
    category: category,
  };

  if (bathroomIncluded != false)
    roomTypeDetails.bathroomIncluded = bathroomIncluded;
  if (maxNumberOfTenants != false)
    roomTypeDetails.maxNumberOfTenants = maxNumberOfTenants;
  if (price != false) roomTypeDetails.price = price;
  if (numberInStock != false) roomTypeDetails.numberInStock = numberInStock;
  if (note != false) roomTypeDetails.note = note;

  var roomType = new RoomType(roomTypeDetails);

  roomType.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log(`New Room Type: ${roomType}`);
    roomTypes.push(roomType);
    callback(null, roomType);
  });
}

function categoryCreate(name, note, callback) {
  categoryDetails = { name: name };

  if (note != false) categoryDetails.note = note;

  var category = new Category(categoryDetails);

  category.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log(`New Category: ${category}`);
    categories.push(category);
    callback(null, category);
  });
}

function createRoomTypes(cb) {
  async.parallel(
    [
      function (callback) {
        roomTypeCreate(
          "Double Private Ensuite",
          categories[0],
          "Yes",
          2,
          250,
          8,
          false,
          callback
        );
      },
      function (callback) {
        roomTypeCreate(
          "Double Private Standard",
          categories[0],
          "No",
          4,
          200,
          6,
          false,
          callback
        );
      },
      function (callback) {
        roomTypeCreate(
          "Double Private Basic",
          categories[0],
          "No",
          2,
          190,
          4,
          false,
          callback
        );
      },
      function (callback) {
        roomTypeCreate(
          "Single Private Basic",
          categories[1],
          "No",
          1,
          150,
          2,
          false,
          callback
        );
      },
      function (callback) {
        roomTypeCreate(
          "8-bed Mixed Dorm",
          categories[2],
          "No",
          8,
          90,
          1,
          false,
          callback
        );
      },
      function (callback) {
        roomTypeCreate(
          "6-bed Mixed Dorm",
          categories[2],
          "No",
          6,
          95,
          1,
          false,
          callback
        );
      },
      function (callback) {
        roomTypeCreate(
          "4-bed Mixed Dorm",
          categories[2],
          "No",
          4,
          100,
          1,
          false,
          callback
        );
      },
      function (callback) {
        roomTypeCreate(
          "6-bed Female Dorm",
          categories[2],
          "No",
          6,
          95,
          1,
          false,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate("Double Rooms", false, callback);
      },
      function (callback) {
        categoryCreate("Single Rooms", false, callback);
      },
      function (callback) {
        categoryCreate("Dorms", false, callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createRoomTypes],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log(`FINAL ERROR: ${err}`);
    } else {
      console.log(`Room Types: ${roomTypes}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
