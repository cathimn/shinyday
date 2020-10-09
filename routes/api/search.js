const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Song, Artist, Album } = require('../../db/models');
const router = require('express').Router();
const matchSorter = require('match-sorter').default;

router.get('/:query', asyncHandler(async (req, res) => {
  const { query } = req.params;

  const search = await Artist.findAll({
    attributes: ["artist_name", "url", "avatar_url"]
  })

  const albums = await Album.findAll({
    attributes: ["name", "url", "cover_url"],
    include: {
      model: Artist,
      as: "artist",
      attributes: ["artist_name", "url"]
    }
  })

  search.push(...albums);

  res.json(matchSorter(search, query, { keys: ["artist_name", "name"] }).slice(0, 5));
}));

module.exports = router;
