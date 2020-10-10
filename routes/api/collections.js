const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { authenticated } = require('./security-utils');

const { User_Collection, User, Album, Artist, Song } = require('../../db/models');


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
