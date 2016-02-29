'use strict';

const translator = require('.');
const googleTranslateGoodMock = {
  translate(body, lang, callback) {
    callback(null, { text: 'bonjour' });
  },
};

const googleTranslateBadMock = {
  translate(body, lang, callback) {
    callback(503, null);
  },
};

describe('translator service', () => {
  let service;

  describe('when return a success', () => {
    before(() => {
      service = translator.init(googleTranslateGoodMock);
    });

    it('should return a promise that resolves', done => {
      service.translate('hello', 'en').then(response => {
        response.text.should.equal('bonjour');
        done();
      });
    });
  });

  describe('when return an error', () => {
    before(() => {
      service = translator.init(googleTranslateBadMock);
    });

    it('should return a promise that rejects', done => {
      service.translate('hello', 'en').then(() => {}, err => {
        err.should.equal(503);
        done();
      });
    });
  });
});
