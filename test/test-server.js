
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var items = server.items;

chai.use(chaiHttp);

describe('Shopping List', function() {
  it('should list items on get', function(done) {
    chai.request(app).get('/items').end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.length(3);
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('name');
      res.body[0].id.should.be.a('number');
      res.body[0].name.should.be.a('string');
      res.body[0].name.should.equal('Broad beans');
      res.body[1].name.should.equal('Tomatoes');
      res.body[2].name.should.equal('Peppers');
      done();
    });  
  }); 
  
  it('should add an item on post', function(done) {
    chai.request(app)
      .post('/items')
      .send({name: 'pizza'})
      .end(function(err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.id.should.be.a('number');
      res.body.name.should.be.a('string');
      res.body.id.should.equal(3);
      res.body.name.should.equal('pizza');
      items.items.should.have.length(4);
      done();
    });
  });
  
  it('should edit an item on put to an existing id', function(done) {
    chai.request(app)
      .put('/items/0')
      .send({name: 'pizza'})
      .end(function(err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.id.should.be.a('number');
      res.body.name.should.be.a('string');
      res.body.id.should.equal(0);
      res.body.name.should.equal('pizza');
      // the post test added an item the 
      // length should now be 4
      items.items.should.have.length(4);
      done();
    });
  });
  
  it('should add new item on put to id that does not exist', function(done) {
    chai.request(app)
      .put('/items/10')
      .send({name: 'pizza'})
      .end(function(err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.id.should.be.a('number');
      res.body.name.should.be.a('string');
      res.body.id.should.equal(10);
      res.body.name.should.equal('pizza');
      // the post test added an item as di
      // this test so length should now be 5
      items.items.should.have.length(5);
      done();
    });
  });
  
  it('should delete an item on delete', function(done) {
    chai.request(app)
      .delete('/items/1')
      .end(function(err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.id.should.be.a('number');
      res.body.name.should.be.a('string');
      res.body.id.should.equal(1);
      res.body.name.should.equal('Tomatoes');
      // the list length should be back to 4
      items.items.should.have.length(4);
      done();
    });
  });
  
  it('should return json error message when attempting to delete item that does not exist', function(done) {
    chai.request(app)
      .delete('/items/21')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('error');
      res.body.id.should.be.a('number');
      res.body.error.should.be.a('string');
      res.body.id.should.equal(21);
      res.body.error.should.equal('Invalid ID supplied.');
      // the list length should not have changed
      items.items.should.have.length(4);
      done();
    });
  });
});
