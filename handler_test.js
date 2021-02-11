'use strict';

module.exports.hello = async (event, context, callback) => {
  const fs = require('fs');
  fs.readFile('./img/sori.png', (err, image) => {
    if (err) {
      console.log(err);
    }
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': "'image/png'",
      },
      body: new Buffer(image).toString('base64'),
      isBase64Encoded: true,
    };
    callback(null, response);
  });
};
  

