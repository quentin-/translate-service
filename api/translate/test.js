const request = require('supertest');
const api = require('../..');

const translatorServiceSuccess = {
  translate() {
    return new Promise(resolve => resolve({ body: 'hola' }));
  },
};

const translatorServiceFailureMock = {
  translate() {
    return new Promise((resolve, reject) => reject(new Error()));
  },
};

describe('GET /translate', () => {
  it('should succeed when translation succeed', done => {
    const app = api({ services: { translator: translatorServiceSuccess } });

    request(app.listen())
    .get('/translate?lang=fr&body=hello')
    .expect({ body: 'hola' })
    .end(done);
  });

  it('should fail when translation fails', done => {
    const app = api({ services: { translator: translatorServiceFailureMock } });

    request(app.listen())
    .get('/translate?lang=fr&body=hello')
    .expect({ error: 'an error occurred' })
    .end(done);
  });
});
