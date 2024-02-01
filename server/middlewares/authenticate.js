const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
  console.log("token: ", token)
  if(!token) {
    return res.status(401).json({error: 'No token provided'});
  }
  const data = jwt.verify(token, 'secret');
  console.log('data: ', data)
  req.userId = data.id;
  const user = await User.findOne({_id: data.id}); 

  if(!user) {
    return res.status(401).json({error: 'User not found'});
  }

  next();
}