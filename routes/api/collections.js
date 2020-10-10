const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { authenticated } = require('./security-utils');

const { User_Collection, User, Album, Artist, Song } = require('../../db/models');

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


router.get('/:username', asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({
    where: { "username": username },
    attributes: ["id"]
  })

  const checkArtist = await Artist.findOne({
    where: { user_id: user.id }
  });

  if (checkArtist) {
    res.json({ isArtist: true });
  } else {
    Album.findAndCountAll({
      include: [{
          model: User,
          where: { id: user.id },
          through: { model: User_Collection, attributes: ["favorite"] },
          attributes: { exclude: ["username", "avatar_url", "email", "password", "banner_url", "session_token", "createdAt", "updatedAt"]}
        },
        {
          model: Song,
          as: "songs",
          attributes: ["id", "name"]
        }
        ],
      attributes: ["id", "name", "url", "cover_url"]
    }).then((result) => {
      result.rows.forEach((album, i) => {
        const fav = album.Users[0].User_Collection.favorite;

        album.setDataValue("favorite", fav)
        album.setDataValue("Users", null);
      })
      return res.json({
        albums: result.rows,
        total: result.count
      })
    })
  }

}))

module.exports = router;
