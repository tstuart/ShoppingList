/*
List of questions for weekly chat:

1. What was I doing wrong in postman?  I thought I was sending json and that
  the bodyParser.json middleware would attach it to req.body.name

2. Do I need getItemByID function?  Are there existing built-in
  methods to handle this functionality?  To this end, in the delete route, I use
  shoppingList.items.splice to remove items.  Should I encapsulate this functionality
  into a method (like the add function)?

3. What are the appropriate status codes to return for each route (upon success and failure)?
  Is there a standard for each type of route?

 */

var express = require('express');
var bodyParser = require('body-parser');
var list = require('./list.js');

// set up app
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// set up initial shopping list
var shoppingList = new list.Items();
shoppingList.add('Broad beans');
shoppingList.add('Tomatoes');
shoppingList.add('Peppers');

// route to get a list of the items
app.get('/items', function(req, res) {
  res.json(shoppingList.items);
});

// route to post an item to the list
app.post('/items', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  var item = shoppingList.add(req.body.name);
  res.status(201).json(item);
});

// route to delete an item from the list
app.delete('/items/:id', function(req, res) {
  var id = Number(req.params.id);
  var item = shoppingList.getItemByID(id);
  if (!item) {
    res.status(400).json({"error": "Invalid ID supplied.", "id": id});
  } else {
    shoppingList.items.splice(shoppingList.items.indexOf(item),1);
    res.status(201).json(item);
  }
});

// route to put an item in the list.  This will
// either update an existing item or add a new one
app.put('/items/:id', function(req, res) {
  var id = Number(req.params.id);
  var name = req.body.name;
  var item = shoppingList.getItemByID(id);
  if (!item) {
    item = shoppingList.add(name);
    item.id = id;
  } else {
    item.name = name;
  }
  res.status(201).json(item);

});

// Set app to listen for requests
app.listen(process.env.PORT || 8080);

exports.app = app;
exports.items = shoppingList;

