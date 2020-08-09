const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const UserRepository = require('../../db/user-repository');
const { Artist } = require('../../db/models')
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

const email =
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .normalizeEmail();

const username =
    check('username')
        .not().isEmpty()
        .withMessage('Please provide a username.');

const password =
    check('password')
        .not().isEmpty()
        .withMessage('Please provide a password.');

router.post('/', email, username, password, asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ status: 422, errors: errors.array() });
    }

    const user = await UserRepository.create(req.body);

    const { jti, token } = generateToken(user);
    user.session_token = jti;
    await user.save();
    res.json({ token, user: user.toSafeObject() });
}));

// router.get('/me', authenticated, function (req, res) {
//     res.json({
//         email: req.user.email,
//         username: req.user.username,
//     });
// });

router.get('/me', authenticated, asyncHandler(async (req, res) => {
    const checkArtist = await Artist.findOne({
        where: {
            user_id: req.user.id
        },
        attributes: ['id', 'artist_name']
    })

    // console.log(checkArtist)

    res.json({
        email: req.user.email,
        username: req.user.username,
        checkArtist: checkArtist,
    })
}));



module.exports = router;