const jwt = require('jsonwebtoken')
const config = require('./../../config/appConfig')

const secret = "59BEEBC54941B2BEE9F7E3FB12851"


let generateToken = function (userData, callback, isPasswordRest = false) {

    let payload = {
        user: userData,
        exp: Math.round(Date.now() / 1000) + config.tokenExpiry * 60 * 60,
        sub: isPasswordRest?'PasswordReset':'AuthToken',
        iss: "ChatApp"
    }

    jwt.sign(payload, secret, {}, callback)

}

let verifyToken = function(token,callback){

    jwt.verify(token,secret,{},callback)

}







module.exports = {
    generateToken:generateToken,
    verifyToken:verifyToken
}