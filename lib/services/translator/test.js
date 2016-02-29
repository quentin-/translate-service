'use strict';

const translator = require('.');

describe('translator service', () => {
  let service;
  let args;

  describe('when client return a success', () => {
    before(() => {
      service = translator.init({
        translate(...rest) {
          args = rest;
          rest[2](null, { text: 'bonjour' });
        },
      });
    });

    it('should return a promise that resolves', done => {
      service.translate('hello', 'en').then(response => {
        args[0].should.equal('hello');
        args[1].should.equal('en');
        response.text.should.equal('bonjour');
        done();
      });
    });
  });

  describe('when client return an error', () => {
    before(() => {
      service = translator.init({
        translate(...rest) {
          args = rest;
          rest[2](503, null);
        },
      });
    });

    it('should return a promise that rejects', done => {
      service.translate('hello', 'fr').then(() => {}, err => {
        args[0].should.equal('hello');
        args[1].should.equal('fr');
        err.should.equal(503);
        done();
      });
    });
  });
});
