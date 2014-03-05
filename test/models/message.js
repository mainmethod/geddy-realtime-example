var assert = require('assert')
  , tests
  , Message = geddy.model.Message;

tests = {

  'after': function (next) {
    // cleanup DB
    Message.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var message = Message.create({});
    message.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
