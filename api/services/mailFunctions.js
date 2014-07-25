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
    crypto = require('crypto'),
    hostname = process.env.HOSTNAME || 'localhost:1337';
///////////////////////////

module.exports = {

  sendActivationEmail: function(res, email, callback){
    crypto.randomBytes(256, function(err, randomBytes){
      errorHandlers.serverError(res, err);
      var emailToken = randomBytes.toString('base64').replace(/\//g,'_').replace(/\+/g,'-'),
          activationMessage = '<a href="http://' + hostname + '/verify?token=' + emailToken + '">Click to verify your Procur account!</a>',
          mailOptions = {
          from: "support@procur.com",
          to: email,
          subject: "Procur Password Assistance",
          generateTextFromHTML: true,
          html: activationMessage
          };
      EmailToken.findOne({ email: email }, function(err, token){
        errorHandlers.serverError(res, err);
        if(token !== undefined){
          EmailToken.destroy(token, function(err, token){
            errorHandlers.serverError(res, err);
          });
        }
        EmailToken.create({ email: email, token: emailToken }, function(err, token){
          errorHandlers.serverError(res, err);
          smtpTransport.sendMail(mailOptions, function(err, response){
            errorHandlers.serverError(res, err);
            callback(res);
          });
        });
      });
    });
  },

  processEmailActivation: function(req, res, activationToken, callback){
    EmailToken.findOne({ token: activationToken}, function(err, token){
      errorHandlers.serverError(res, err);
      if(token === undefined){ return res.send(400, 'Invalid activation token'); }
      userFunctions.findByEmail(token.email, function(err, user){
        userFunctions.setEmailVerified(res, user, function(user){
          callback(user);
        });
      });
    });
  }
};
