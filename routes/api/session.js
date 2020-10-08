const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const UserRepository = require('../../db/user-repository');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

const login =
    check('login')
        .not().isEmpty()
        .withMessage('Please provide a username/email.');

const password =
    check('password')
        .not().isEmpty()
        .withMessage('Please provide a password.');

router.put('/', [login, password], asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return next({ state: 422, errors: errors.array() });
  }

  const { login, password } = req.body;

  let user;
  if (login.includes('@')) {
    user = await UserRepository.findByEmail(login);
  } else {
    user = await UserRepository.findByUsername(login);
  }

  if (!user.isValidPassword(password)) {
    const err = new Error('Login failed.');
    err.status = 401;
    err.title = 'Login failed.';
    err.errors = ['Invalid credentials.'];
    return next(err);
  }

  const { jti, token } = generateToken(user);
  user.session_token = jti;
  await user.save();

  res.json({ token, user: user.toSafeObject() });
}));

router.delete('/', [authenticated], asyncHandler(async (req, res) => {
  req.user.session_token = null;
  await req.user.save();
  res.json({ message: 'success' });
}));

module.exports = router;
