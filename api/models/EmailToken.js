/**
* EmailToken.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  attributes: {
    email: {
      type: 'email',
      required: 'true',
      unique: true
    },
    token: {
      type: 'string',
      required: 'true',
      unique: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};

