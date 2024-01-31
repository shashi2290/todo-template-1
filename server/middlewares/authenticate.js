const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("token: ", token)
  const data = jwt.verify(token, 'secret');
  console.log('data: ', data)
  req.userId = data.id;
  const user = await User.findOne({_id: data.id}); 

  if(!user) {
    return res.status(401).send({error: 'User not found'});
  }

  next();
}