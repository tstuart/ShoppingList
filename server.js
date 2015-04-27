
var express = require('express');
var bodyParser = require('body-parser');

var Items = function() {
  this.items = [];
  this.id = 0;
};

Items.prototype.add = function(name) {
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};

Items.prototype.getItemByID = function(id) {
  var item = undefined;
  for (i = 0; i < this.items.length; i++) {
    if (this.items[i].id == id) {
      item = this.items[i];
      break;
    }
  }
  return item;
};

var items = new Items();
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