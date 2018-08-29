const mongoose = require('mongoose');
const response = require('./../libs/responseLib');
const shortId = require('short-id')
const logger = require('./../libs/loggerLib');
const validationLib = require('./../libs/validationLib')
const passwordLib = require('./../libs/passwordLib')
const tokenLib = require('./../libs/tokenLib')
const eventEmitter = require('./../libs/eventLib').eventEmitter



const User = mongoose.model('User')
const Auth = mongoose.model('Auth')


let signup = function (req, res) {

    let verifyUserInput = function () {
        return new Promise((resolve, reject) => {
            if (!validationLib.isValidEmail(req.body.email)) {
                let apiResponse = response.generate(true, "Invalid email id.", 403, null)
                reject(apiResponse)
            }

            if (req.body.password == undefined || !validationLib.isValidPassword(req.body.password)) {
                let apiResponse = response.generate(true, "Invalid password pattern. Password should be minimum 8 characters and start with an alphabet or a number", 403, null)
                reject(apiResponse)
            }
            resolve()
        })
    }

    let checkExistingUser = function () {
        return new Promise((resolve, reject) => {
            User.findOne({ email: req.body.email })
                .lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, "User SignUp: checkExistingUser", 5)
                        let apiResponse = response.generate(true, "Some error occured.", 500, null)
                        reject(apiResponse)
                    } else if (result) {
                        let apiResponse = response.generate(true, "Email already registered.", 403, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }

    let createUser = function () {

        return new Promise((resolve, reject) => {

            let user = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userId: shortId.generate(),
                password: passwordLib.encryptPassword(req.body.password)
            })

            user.save((err, result) => {
                if (err) {
                    let apiResponse
                    if (err.name = "ValidationError") {
                        apiResponse = response.generate(true, err.message, 403, null)
                    } else {
                        apiResponse = response.generate(true, "Internal server error.", 500, null)
                    }
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })


        })

    }


    verifyUserInput()
        .then(checkExistingUser)
        .then(createUser)
        .then((userData) => {
            // let data = {
            //     id: userData.userId,
            //     firstName: userData.firstName,
            //     lastName: userData.lastName,
            //     email: userData.email
            // }
            //sending email for signup
            eventEmitter.emit('signupEmail', userData.email, userData.firstName)

            let apiResponse = response.generate(false, "User registered successfully.", 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)
        })

}

let login = function (req, res) {

    let userData;

    let validateAndFind = function () {
        return new Promise((resolve, reject) => {
            if (req.body.email && req.body.password) {
                User.findOne({ email: req.body.email })
                    .select("firstName lastName email userId password")
                    .lean()
                    .exec((err, result) => {
                        if (err) {
                            console.log(err)
                            let apiResponse = response.generate(true, "Internal server error", 500, null)
                            reject(apiResponse)
                        } else if (result) {
                            passwordLib.comparePassword(req.body.password, result.password, (err, match) => {
                                if (err) {
                                    let apiResponse = response.generate(true, "Internal server error", 500, null)
                                    reject(apiResponse)
                                } else if (!match) {
                                    let apiResponse = response.generate(true, "Invalid credentials", 403, null)
                                    reject(apiResponse)
                                } else {
                                    delete result.password
                                    delete result._id
                                    userData = result
                                    resolve(result)
                                }
                            })

                        } else {
                            let apiResponse = response.generate(true, "Email not registered", 404, null)
                            reject(apiResponse)
                        }
                    })
            } else {
                let apiResponse = response.generate(true, "Email and password must be provided", 403, null)
                reject(apiResponse)
            }
        })
    }

    let getToken = function (userData) {

        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userData, (err, token) => {
                if (err) {
                    console.log("error here")
                    let apiResponse = response.generate(true, "Internal server error.", 500, null)
                    reject(apiResponse)
                } else {
                    resolve(token)
                }
            })
        })
    }


    let saveToken = function (token) {
        return new Promise((resolve, reject) => {

            let auth = new Auth({
                authToken: token
            })

            auth.save((err, result) => {

                if (err) {
                    let apiResponse = response.generate(true, "Internal server error", 500, null)
                    reject(apiResponse)
                } else {
                    resolve(token)
                }
            })
        })

    }

    validateAndFind()
        .then(getToken)
        .then(saveToken)
        .then((token) => {
            let apiResponse = response.generate(false, "User logged in", 200, { authToken: token, userId: userData.userId, firstName: userData.firstName, lastName: userData.lastName })
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)
        })
}


let forgotPassword = function (req, res) {

    let userData

    let findUser = function () {

        return new Promise((resolve, reject) => {
            User.findOne({ email: req.body.email })
            .select('userId firstName lastName email')
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, "Internal server error", 500, null)
                        reject(apiResponse)
                    } else if (result) {
                        userData = result
                        delete result._id
                        resolve(result)
                    } else {
                        let apiResponse = response.generate(true, "This email is not registered", 404, null)
                        reject(apiResponse)
                    }
                })

        })
    }


    let generateToken = function (userData) {

        return new Promise((resolve, reject) => {

            tokenLib.generateToken(userData, (err, token) => {

                if (err) {
                    let apiResponse = response.generate(true, "Internal server error", 500, null)
                    reject(apiResponse)
                } else {
                    resolve(token)
                }
            }, true)

        })
    }


    let saveResetToken = function (token) {

        return new Promise((resolve, reject) => {
            User.updateOne({ email: req.body.email }, { passwordResetToken: token })
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, "Internal server error", 500, null)
                        reject(apiResponse)
                    } else {
                        resolve(token)
                    }
                })
        })

    }


    findUser()
        .then(generateToken)
        .then(saveResetToken)
        .then((token) => {

            eventEmitter.emit('forgotPassEmail', userData.email, token)
            let apiResponse = response.generate(false, "Password reset email sent.", 200, null)
            res.send(apiResponse)

        })
        .catch((err) => {
            res.send(err)
        })

}




let updatePassword = function (req, res) {

    // verify if new password is valid one or not.
    if (req.body.password && validationLib.isValidPassword(req.body.password)) {

        // update the password and clear the password reset token to prevent further use.
        User.updateOne({ userId: req.user.userId }, { password: passwordLib.encryptPassword(req.body.password), passwordResetToken:'' })
            .exec((err, result) => {
                if (err) {
                    let apiResponse = response.generate(true, "Internal server error", 500, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, "Password updated", 200, null)
                    res.send(apiResponse)
                }
            })
    } else {
        let apiResponse = response.generate(true, "New password should be at least 8 characters and start with a number or alphabet", 500, null)
        res.send(apiResponse)
    }
}










module.exports = {
    signup: signup,
    login: login,
    forgotPassword: forgotPassword,
    updatePassword: updatePassword
}
