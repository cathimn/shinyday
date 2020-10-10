const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { authenticated } = require('./security-utils');

const { User_Collection, Album, Artist } = require('../../db/models');

router.get('/id/:albumId', authenticated, asyncHandler(async (req, res) => {
  const { albumId } = req.params;

  const check = await User_Collection.findOne({
    where: {
      album_id: albumId,
      user_id: req.user.id
    }
  })

  res.json({ "collection": check ? true : false })
}));


router.post('/', authenticated, asyncHandler(async (req, res) => {
  const { pathname } = req.body;

  const artistAlbum = pathname.split("/").slice(1);

  const album = await Album.findOne({
    where: { url: artistAlbum[1] },
    include: {
      model: Artist,
      as: "artist",
      where: { url: artistAlbum[0] }
    }
  })

  const newPurchase = User_Collection.build({
    "album_id": album.id,
    "user_id": req.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  await newPurchase.save();

  res.json(album);
}));


module.exports = router;
