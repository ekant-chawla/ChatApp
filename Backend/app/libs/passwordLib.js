const bcrypt = require('bcrypt')
const saltRounds = 10

let encryptPassword = function (password) {
    return bcrypt.hashSync(password, saltRounds)
} // we need password immediately as we need to generate the user and save. So we return the encrypted password instead of involving callbacks

let comparePassword = function (password, hash, cb) {
    bcrypt.compare(password, hash, cb)
}

module.exports = {
    encryptPassword: encryptPassword,
    comparePassword: comparePassword
}