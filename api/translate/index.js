const v1 = require('api/v1');

exports.translate = function *() {
  const body = this.request.query.body;
  const lang = this.request.query.lang;

  try {
    this.body = yield this.services.translator.translate(body, lang);
  } catch (e) {
    v1.error.call(this, 503);
  }
};
