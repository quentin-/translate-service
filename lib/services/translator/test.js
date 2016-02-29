const translator = require('.');

describe('translator service', () => {
  describe('when return a success', () => {
    before(() => {
      translator.client = {
        translate: function(body, lang, callback) {
          callback(null, {text: 'bonjour'});
        }
      };
    });

    it('should return a promise that resolves', done => {
      translator.translate('hello', 'en').then(response => {
        response.text.should.equal('bonjour');
        done();
      });
    });
  });

  describe('when return an error', () => {
    before(() => {
      translator.client = {
        translate: function(body, lang, callback) {
          callback(503, null);
        }
      };
    });

    it('should return a promise that rejects', done => {
      translator.translate('hello', 'en').then(() => {}, err => {
        err.should.equal(503);
        done();
      });
    });
  });
});
