const UserReg = require('../../models/UserRegistrationSchema');

module.exports = (app) => {
  app.get('/user/register', (req, res, next) => {
    console.log('testing this');
  });

  app.post('/user/register', function (req, res, next) {
    const user = new UserReg({
      fname : req.body.fname,
      lname : req.body.lname,
      email : req.body.email,
      business_id : req.body.business_id,
      password : req.body.password
    });

    UserReg.createUser(user, function(err, result){
      if(err){
        if (err.name === 'BulkWriteError' && err.code === 11000) {
          error = "Email is already in use";
          res.send({
            message : "Email is already in use"
          });
        } else {
          error = err;
          res.send({
            message: "A test message with an error"
            // message : error
          });
        }
        return console.log(error);

      } else {      
        return res.json({message: 'Account has been created! You may now log in'});
      }
    });
  });
};
