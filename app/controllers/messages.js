var Messages = function () {
  this.before(require('../helpers/passport').requireAuth);
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Message.all(function(err, messages) {
      if (err) {
        throw err;
      }
      self.respondWith(messages, {type:'Message'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , message = geddy.model.Message.create(params);

    if (!message.isValid()) {
      this.respondWith(message);
    }
    else {
      message.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(message, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Message.first(params.id, function(err, message) {
      if (err) {
        throw err;
      }
      if (!message) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(message);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Message.first(params.id, function(err, message) {
      if (err) {
        throw err;
      }
      if (!message) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(message);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Message.first(params.id, function(err, message) {
      if (err) {
        throw err;
      }
      message.updateProperties(params);

      if (!message.isValid()) {
        self.respondWith(message);
      }
      else {
        message.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(message, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Message.first(params.id, function(err, message) {
      if (err) {
        throw err;
      }
      if (!message) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Message.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(message);
        });
      }
    });
  };

};

exports.Messages = Messages;
