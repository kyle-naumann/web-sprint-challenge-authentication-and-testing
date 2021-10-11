const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const { checkCredentials, checkUsernameAvailable, checkUserRegistered } = require('./auth-middleware')
const tokenBuilder = require('./token-builder.js')

router.post('/register', checkCredentials, checkUsernameAvailable, (req, res, next) => {
  // res.end('implement register, please!');

  const user = req.body

  const rounds = 8
  const hash = bcrypt.hashSync(user.password, rounds)

  user.password = hash

  Users.add(user)
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(next)
});


router.post('/login', checkCredentials, checkUserRegistered, (req, res, next) => {
  res.end('implement login, please!');
  const user = req.body

  const token = tokenBuilder(user)

  try {
    res.status(200).json({
    message: `welcome, ${user.username}`,
    token
    })
  }
  catch (err) {
    next(err)
  }

});


router.use((err, req, res,) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});


module.exports = router;
