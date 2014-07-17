module.exports = {

  serverError: function(res, err){
    if(err){
      Log.create({ content: err }, function(err, error){
        //this seems dumb.
        return res.send(500, 'Lost in space!');
      });
    }
  },

  notFound: function(res, collection){
    if(collection === undefined){
      Log.create({ content: 'Query for "' + collection + '" returned undefined' }, function(err, log){
        return res.send(404);
      });
    }
  }
};
