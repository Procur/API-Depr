var bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = {
    generate: function(callback) {
        crypto.randomBytes(128, function(err, baseHash){
            var prehash = baseHash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(prehash, salt, function(err, hash){
                    callback(hash);
                });
            });
        });
    }
}