
// Put the Items functionality in its own library

// Items Constructor
var Items = function() {
  this.items = [];
  this.id = 0;
};

// Items Add Method
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

// export Items Class
exports.ShoppingList = Items;