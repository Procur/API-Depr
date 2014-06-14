//  INCLUSIONS AND CONFIG //
var nodemailer = require('nodemailer'),
    mandrill = {
      username: "app25459603@heroku.com",
      pass: "_tko3ueulFUKJ4Grtv9cmQ"
    },
    smtpTransport = nodemailer.createTransport("SMTP", {
      service: "Mandrill",
      auth: {
        user: mandrill.username,
        pass: mandrill.pass
      }
    }),
    handler = require('../errorHandlers.js'),
    apiuser = require('../models/userFunctions.js'),
    hostname = process.env.HOSTNAME || 'localhost:1337';
///////////////////////////

module.exports = {

  sendActivationEmail: function(res, email, callback){
    crypto.randomBytes(256, function(err, randomBytes){
      handler.serverError(res, err);
      var emailToken = randomBytes.toString('base64').replace(/\//g,'_').replace(/\+/g,'-'),
          activationMessage = '<a href="http://' + hostname + '/verify?token=' + emailToken + '">Click to verify your Procur account!</a>',
          mailOptions = {
          from: "support@procur.com",
          to: user.email,
          subject: "Procur Password Assistance",
          generateTextFromHTML: true,
          html: activationMessage
          };
      EmailToken.create({ email: email, token: emailToken }, function(err, token){
        handler.serverError(res, err);
        smtpTransport.sendMail(mailOptions, function(err, response){
          handler.serverError(res, err);
          callback(response);
        });
      });
    });
  },

  processEmailActivation: function(req, res, activationToken, callback){
    EmailToken.findOne({ token: activationToken}, function(err, token){
      handler.serverError(res, err);
      if(token === undefined){ return res.send(400, 'Invalid activation token'); }
      apiuser.findByEmail(token.email, function(err, user){
        apiuser.setEmailVerified(res, user, function(user){
          callback(user);
        });
      });
    });
  }
};