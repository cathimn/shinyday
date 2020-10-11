const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize')
const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey, region } = require('../.././config/index');

AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey,
});

const s3 = new AWS.S3();
const router = express.Router();

const { Artist, Album, Song, Genre } = require('../../db/models')

router.get('/curated', asyncHandler(async (req, res) => {
  const curated = await Album.findAll({
    attributes: ["name", "url", "cover_url", "description", "createdAt"],
    include: [
      {
        model: Artist,
        as: "artist",
        required: true,
        attributes: ["artist_name", "url"] },
      {
        model: Genre,
        as: "genre",
        required: true,
        attributes: ["genre"]
      }],
    where: {
      url: { [Op.or]: ["heatofthesummer", "lullaby", "iwannahearthemusic", "funeralvoid", "haumea"] }
    }
  });

  res.json(curated)
}));

router.get('/genre=:id/page=:page', asyncHandler(async (req, res) => {
  const { id, page } = req.params;
  const limit = 5;
  const offset = limit;

  if (Number(id) === 0) {
    Album.findAndCountAll({
      limit: limit,
      offset: offset * page,
      attributes: ["name", "url", "cover_url", "description", "createdAt"],
      include: [
        {
          model: Artist,
          as: "artist",
          required: true,
          attributes: ["artist_name", "url"]
        },
        {
          model: Genre,
          as: "genre",
          required: true,
          attributes: ["genre"]
        }],
      order: [['id', 'DESC']],
    }).then(result =>
      res.json({
        albums: result.rows,
        total: Math.ceil(result.count/limit),
        end: (result.count - (limit * page)) < limit }))
  } else {
    Album.findAndCountAll({
      attributes: ["name", "url", "cover_url", "description", "createdAt"],
      limit: limit,
      offset: offset * page,
      include: [
        {
          model: Artist,
          as: "artist",
          required: true,
          attributes: ["artist_name", "url"]
        },
        {
          model: Genre,
          as: "genre",
          required: true,
          where: { id: id },
          attributes: ["genre"]
        }],
      order: [['createdAt', 'DESC']],
    }).then(result =>
      res.json({
        albums: result.rows,
        end: (result.count - (limit * page)) < limit
      }))
  }

}));

router.get('/:artistTerm/:albumTerm?', asyncHandler(async (req, res) => {
  const { artistTerm, albumTerm } = req.params;

  const artist = await Artist.findOne({
    include: {
      model: Album,
      as: "albums",
      required: true,
      attributes: { exclude: ["createdAt", "updatedAt", "artist_id"] },
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { url: artistTerm },
  });

  if (!albumTerm) {
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).json("Invalid artist")
    }
  } else {
    const album = await Album.findOne({
      where: { url: albumTerm, artist_id: artist.id },
      include: {
        model: Song,
        as: "songs",
        required: true,
        attributes: { exclude: ["createdAt", "updatedAt", "album_id"]},
      },
      attributes: { exclude: ["updatedAt"] }
    })

    if (album) {
      res.json(album);
    } else {
      res.status(404).json("Invalid album")
    }
  } 
}));

module.exports = router;
