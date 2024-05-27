const crypto = require('crypto')

const algorithm = 'aes-256-ctr'

const decrypt = hash => {
  const decipher = crypto.createDecipheriv(algorithm, process.env.SECRET_KEY, Buffer.from(hash.iv, 'hex'))

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

  return decrpyted.toString()
}

module.exports = decrypt