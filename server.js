
var express = require('express');

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

var items = new Items();
items.add('Broad beans');
items.add('Tomatoes');
items.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
  res.json(items.items);
});

app.listen(process.env.PORT || 8080);