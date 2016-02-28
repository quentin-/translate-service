const translator = require('lib/services/translator');

// Apply all the services (or injected services)
module.exports = function(services) {
  services = services || {};

  return function *(next) {
    this.services = this.services || {};
    this.services.translator = services.translator || translator;
    yield next;
  }
};
