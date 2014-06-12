var bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = {
    hashPassword: function(password, callback){
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, function(err, hash){
                callback(err, hash);
            });
        });
    }
}