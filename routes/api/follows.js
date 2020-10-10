const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { authenticated } = require('./security-utils');

const { User_Follow } = require('../../db/models');

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


module.exports = router;
