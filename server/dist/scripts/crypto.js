'use strict';

var crypto = require('crypto');

var algorithm = 'aes-256-ctr';

var decrypt = function decrypt(hash) {
  var decipher = crypto.createDecipheriv(algorithm, process.env.SECRET_KEY, Buffer.from(hash.iv, 'hex'));

  var decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
};

module.exports = decrypt;