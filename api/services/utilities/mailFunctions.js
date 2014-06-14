//  INCLUSIONS AND CONFIG //
var nodemailer = require('nodemailer'),
    mandrill = sails.config.mandrill,
    smtpTransport = nodemailer.createTransport("SMTP", {
      service: "Mandrill",
      auth: {
        user: mandrill.username,
        pass: mandrill.pass
      }
    });

var activation = '<a href="http://' + address + '/verify?token=' + token + '">Click to verify your Procur account!</a>';

module.exports = {
  activation: function(email, callback){

    var mailOptions = {
      from: "support@procur.com",
      to: user.email,
      subject: "Procur Password Assistance",
      generateTextFromHTML: true,
      html: htmlContent
    };



  }
}