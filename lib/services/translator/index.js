'use strict';

const key = process.env.GOOGLE_TRANSLATE_API_KEY;

class Translator {
  constructor(client) {
    this.client = client || require('google-translate')(key);
  }

  translate(body, lang) {
    return new Promise((resolve, reject) => {
      this.client.translate(body, lang, (err, response) => {
        return err ? reject(err) : resolve(response);
      });
    });
  }
};

module.exports = new Translator();
