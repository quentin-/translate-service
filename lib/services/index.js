const translator = require('lib/services/translator');
const fs = require('fs');

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

const serviceNames = getDirectories('lib/services');

// Apply all the services (or injected services)
module.exports = function(services) {
  services = services || {};
  return function *(next) {
    this.services = {};

    for (serviceName of serviceNames) {
      this.services[serviceName] = (
        services[serviceName] || require('lib/services/' + serviceName).init()
      );
    }

    yield next;
  }
};
