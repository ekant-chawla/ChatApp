const mongoose = require('mongoose');
const shortId = require('short-id')
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const tokenLib = require('./../libs/tokenLib')

const Auth = mongoose.model('Auth')
const User = mongoose.model('User')


// a middleware to verify the signature and expiry of the authToken and extract user data from it.
let verifyAuthToken = function (req, res, next) {
    if (req.body.authToken) {
        //verify if the token was generated by server.
        Auth.findOne({ authToken: req.body.authToken })
            .lean()
            .exec((err, result) => {
                if (err) {

                    let apiResponse = response.generate(true, "Internal server error", 500, null)
                    res.send(apiResponse)

                } else if (result) {

                    //token was created by server.Verifing secret and expiry.
                    tokenLib.verifyToken(req.body.authToken, (err, decoded) => {
                        if (err) {
                            let apiResponse = response.generate(true, "Invalid or expired token", 403, null)
                            res.send(apiResponse)
                        } else {
                            req.user = decoded.user
                            next()
                        }
                    })

                } else {

                    let apiResponse = response.generate(true, "Invalid authToken", 403, null)
                    res.send(apiResponse)

                }
            })

    } else {
        let apiResponse = response.generate(true, "AuthToken missing", 403, null)
        res.send(apiResponse)
    }
}



let verifyPassResetToken = function (req, res, next) {
    if (req.body.authToken) {
        //verify if the token was generated by server.
        User.findOne({ passwordResetToken: req.body.authToken })
            .lean()
            .exec((err, result) => {
                if (err) {

                    let apiResponse = response.generate(true, "Internal server error", 500, null)
                    res.send(apiResponse)

                } else if (result) {

                    //token was created by server.Verifing secret and expiry.
                    tokenLib.verifyToken(req.body.authToken, (err, decoded) => {
                        if (err) {
                            let apiResponse = response.generate(true, "Invalid or expired token", 403, null)
                            res.send(apiResponse)
                        } else {
                            req.user = decoded.user
                            next()
                        }
                    })

                } else {

                    let apiResponse = response.generate(true, "Invalid authToken", 403, null)
                    res.send(apiResponse)

                }
            })

    } else {
        let apiResponse = response.generate(true, "AuthToken missing", 403, null)
        res.send(apiResponse)
    }
}









module.exports = {
    verifyAuthToken: verifyAuthToken,
    verifyPassResetToken: verifyPassResetToken
}