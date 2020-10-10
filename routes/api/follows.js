const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { authenticated } = require('./security-utils');

const { User_Follow, User, Artist } = require('../../db/models');

router.get('/id/:artistId', authenticated, asyncHandler(async (req, res) => {
  const { artistId } = req.params;

  const check = await User_Follow.findOne({
    where: {
      artist_id: artistId,
      user_id: req.user.id
    }
  })

  res.json({ "following": check ? true : false })
}));

router.post('/', authenticated, asyncHandler(async (req, res) => {
  const { artistId } = req.body;

  const newFollow = User_Follow.build({
    "artist_id": artistId,
    "user_id": req.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  await newFollow.save();

  res.json({ "following": true})
}));

router.delete('/', authenticated, asyncHandler(async (req, res) => {
  const { artistId } = req.body;
  const entry = await User_Follow.findOne({
      where: {
        artist_id: artistId,
        user_id: req.user.id,
      }
  })

  await entry.destroy();

  res.json({ "following": false })
}))

router.get('/:username', asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({
      where: { "username": username },
      attributes: ["id"]
    });

    const checkArtist = await Artist.findOne({
      where: { user_id: user.id }
    });

    if (checkArtist) {
      res.json({ isArtist: true });
    } else {
      Artist.findAndCountAll({
        include: {
          where: { id: user.id },
          model: User,
          through: { model: User_Follow },
          attributes: [],
        },
        attributes: ["id", "artist_name", "url", "avatar_url"]
      }).then(result => res.json({
        artists: result.rows,
        total: result.count
      }))
    }
}));

module.exports = router;
