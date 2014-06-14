module.exports = {

  serverError: function(res, err){
    if(err){
      return res.send(500, 'Lost in space!');
    }
  }
}