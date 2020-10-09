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

const { Artist, Album, Song, Genre, Sequelize, sequelize } = require('../../db/models')

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
      id: { [Op.or]: [2, 5, 11, 10, 12] }
    }
  });

  res.json(curated)
}));

router.get('/genre=:id/page=:page', asyncHandler(async (req, res) => {
  const { id, page } = req.params;

  if (Number(id) === 0) {
    Album.findAndCountAll({
      limit: 5,
      offset: 5 * page,
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
      order: [['createdAt', 'DESC']],
    }).then(result =>
      res.json({
        albums: result.rows,
        end: (result.count - (5 * page)) < 5 }))
  } else {
    Album.findAndCountAll({
      attributes: ["name", "url", "cover_url", "description", "createdAt"],
      limit: 5,
      offset: 5 * page,
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
        end: (result.count - (5 * page)) < 5
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
    where: { url: artistTerm },
    attributes: { exclude: ["createdAt", "updatedAt"] }
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
      attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    if (album) {
      res.json(album);
    } else {
      res.status(404).json("Invalid album")
    }
  } 
}));

module.exports = router;
