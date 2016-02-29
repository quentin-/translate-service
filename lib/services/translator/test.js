const translator = require('.');

const googleTranslateGoodMock = {
  translate: function(body, lang, callback) {
    callback(null, {text: 'bonjour'});
  }
};

const googleTranslateBadMock = {
  translate: function(body, lang, callback) {
    callback(503, null);
  }
};

describe('translator service', () => {
  var service;

  describe('when return a success', () => {
    before(() => service = translator.init(googleTranslateGoodMock));

    it('should return a promise that resolves', done => {
      service.translate('hello', 'en').then(response => {
        response.text.should.equal('bonjour');
        done();
      });
    });
  });

  describe('when return an error', () => {
    before(() => service = translator.init(googleTranslateBadMock));

    it('should return a promise that rejects', done => {
      service.translate('hello', 'en').then(() => {}, err => {
        err.should.equal(503);
        done();
      });
    });
  });
});
