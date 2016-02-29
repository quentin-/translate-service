'use strict';

const request = require('supertest');
const api = require('../..');

describe('GET /translate', () => {
  let args;
  let translator;

  describe('when service succeed', () => {
    before(() => {
      translator = {
        translate(...rest) {
          args = rest;
          return new Promise(resolve => resolve({ body: 'hola' }));
        },
      };
    });

    it('should succeed', done => {
      const app = api({ services: { translator } });

      request(app.listen())
      .get('/translate?lang=es&body=hello')
      .expect({ body: 'hola' })
      .end(() => {
        args[0].should.equal('hello');
        args[1].should.equal('es');
        done();
      });
    });
  });

  describe('when service fails', () => {
    before(() => {
      translator = {
        translate(...rest) {
          args = rest;
          return new Promise((resolve, reject) => reject(new Error()));
        },
      };
    });

    it('should fails', done => {
      const app = api({ services: { translator } });

      request(app.listen())
      .get('/translate?lang=fr&body=hello')
      .expect({ error: 'an error occurred' })
      .end(() => {
        args[0].should.equal('hello');
        args[1].should.equal('fr');
        done();
      });
    });
  });
});
