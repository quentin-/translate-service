const fs = require('fs');

function getDirectories(path) {
  return fs.readdirSync(path).filter(file =>
    fs.statSync(`${path}/${file}`).isDirectory()
  );
}

const serviceNames = getDirectories('lib/services');

// Apply all the services (or injected services)
module.exports = servicesOption => {
  const services = servicesOption || {};

  return function *(next) {
    this.services = {};

    for (const serviceName of serviceNames) {
      this.services[serviceName] = (
        services[serviceName] || require(`lib/services/${serviceName}`).init()
      );
    }

    yield next;
  };
};
