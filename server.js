
var express = require('express');
var bodyParser = require('body-parser');
var list = require('./list.js');

// set up initial shopping list
var shoppingList = new list.Items();

items.add('Broad beans');
items.add('Tomatoes');
items.add('Peppers');
items.add('Dogs');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
  res.json(items.items);
});

var jsonParser = bodyParser.json();

app.post('/items', jsonParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  var item = items.add(req.body.name);
  res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
  var id = req.params.id;
  var item = items.getItemByID(id);
  if (!item) {
    res.json({"error": "Invalid ID supplied.", "id": id});
  } else {
    res.status(201).json(item);
  }
});

app.put('/items/:id', jsonParser, function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var item = items.getItemByID(id);
  if (!item) {
    item = items.add(name);
  } else {
    item.name = name;
  }
  res.status(201).json(item);

});

app.listen(process.env.PORT || 8080);