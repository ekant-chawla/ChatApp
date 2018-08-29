const nodemailer = require('nodemailer')
const logger = require('./loggerLib')

let sendEmail = function (email, subject, body) {

    const transport = {
        service: 'gmail',
        auth: {
            user: "nodemailer.test.ekant@gmail.com", // generated ethereal user
            pass: "nodemailer" // generated ethereal password
        }
    }

    let transporter = nodemailer.createTransport(transport);

    let mailOptions = {
        from: '"Group Chat" <nodemailer.test.ekant@gmail.com>', // sender address
        to: email,
        subject: subject,
        html: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error(error, "Mailer", 10)
        }

    });
}



let signUpEmail = function (email, firstName) {

    sendEmail(email, "Welcome Email", `Thank you for signing up at GroupChat ${firstName}. Have fun chatting with your mates!`)

}


let forgotPassEmail = function (email, passResetToken) {

    let html = `<p> Ohh.. did you forget your pass? No worries! simply click on the below link <br> <a href ='http://localhost:4200/reset-password?token=${passResetToken}' > link </a></p>`
    sendEmail(email, "Password Reset", html)

}



module.exports = {
    sendEmail: sendEmail,
    signUpEmail: signUpEmail,
    forgotPassEmail: forgotPassEmail
}