const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const UserRepository = require('../../db/user-repository');
const { User, Artist, Album, Song, User_Collection, User_Follow } = require('../../db/models')
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

router.get('/me', authenticated, asyncHandler(async (req, res) => {
  const checkArtist = await Artist.findOne({
    where: { user_id: req.user.id },
    attributes: ['id', 'artist_name']
  });

  res.json({
    id: req.user.id,
    email: req.user.email,
    username: req.user.username,
    avatarUrl: req.user.avatar_url,
    bannerUrl: req.user.banner_url,
    checkArtist: checkArtist,
  });
}));


router.get('/:username', asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({
    where: { "username": username },
    attributes: ["id", "username", "avatar_url", "banner_url"]
  });

  const checkArtist = await Artist.findOne({
    where: { user_id: user.id }
  });

  if (checkArtist) {
    res.json({ isArtist: true });
  } else {
    const follows = await Artist.findAndCountAll({
      include: {
        where: { id: user.id },
        model: User,
        through: { model: User_Follow },
        attributes: [],
      },
      attributes: ["id", "artist_name", "url", "avatar_url"]
    })

    Album.findAndCountAll({
      include: [{
        model: User,
        where: { id: user.id },
        through: {
          model: User_Collection,
          attributes: ["favorite"],
        },
        attributes: { exclude: ["username", "avatar_url", "email", "password", "banner_url", "session_token", "createdAt", "updatedAt"] }
      },
      {
        model: Song,
        as: "songs",
        attributes: ["id", "name"]
      },
      {
        model: Artist,
        as: "artist",
        attributes: ["artist_name", "url"],
      }
      ],
      attributes: ["id", "name", "url", "cover_url"],
      order: [["id", "DESC"]],
    }).then((result) => {
      result.rows.forEach((album, i) => {
        const songId = album.Users[0].User_Collection.favorite;

      
        album.setDataValue("favorite", songId);
        album.setDataValue("Users", null);
      })
      return res.json({
        user: user,
        collection: {
          albums: result.rows,
          total: result.rows.length
        },
        following: {
          artists: follows.rows,
          total: follows.count
        }
      })
    })
  }

}))

module.exports = router;
