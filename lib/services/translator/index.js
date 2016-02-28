const key = process.env.GOOGLE_TRANSLATE_API_KEY;
const client = require('google-translate')(key);

function translate(body, lang) {
  return new Promise(function(resolve, reject) {
    client.translate(body, lang, function(err, response) {
      return err ? reject(err) : resolve(response);
    });
  });
};

module.exports = {
  translate: translate
};
