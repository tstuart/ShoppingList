
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
      done();
    });
  });
  
  it('should delete an item on delete');
  it('should return json error message when attempting to delete item that does not exist')
});
