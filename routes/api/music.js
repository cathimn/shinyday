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

const { Artist, Album, Song, Sequelize } = require('../../db/models')

const regex = /[\s|\W]/gm;

router.get('/latest', asyncHandler(async (req, res) => {
    const flat = new Array();
    const latest = await Album.findAll({
        limit: 5,
        attributes: ["name"],
        include: [{
            model: Artist,
            as: "artist",
            required: true,
            attributes: ["artist_name"] }]
    });
    latest.forEach(ele => {
        flat.push({ album: ele.name, artist: ele.artist.artist_name })
    });

    res.json(flat)
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

// router.post('/tracklist', asyncHandler(async (req, res) => {
//     const { searchId } = req.body;
//     const tracklist = await Album.findOne({
//         where: {
//             id: {[Op.eq]: searchId}
//         },
//         include: [{model: Song, as: "songs", attributes: ["name"]}],
//         attributes: ["name"] });
//     res.json(tracklist.songs.map(ele => ele.name))
// }));

// router.post('/songfiles', asyncHandler(async (req, res) => {
//     const { prefix } = req.body;
//     const fullPrefix = `artists/${prefix}`
//     const response = await s3.listObjectsV2({
//         Bucket: 'shinyday',
//         Prefix: fullPrefix,
//         Delimiter: ".mp3"
//     }).promise();
//     const songUrls = response.CommonPrefixes.map(ele => ele.Prefix)
//     res.json(songUrls);
// }))

// router.post('/songnames', asyncHandler(async (req, res) => {
//     const { album } = req.body;
//     let albumId = null;

//     const albums = await Album.findAll({
//         attributes: ["id", "name"]
//     });

//     for (let i = 0; i < albums.length; i++) {
//         if ((albums[i].name).toLowerCase().replace(regex, "").includes(album)) {
//             albumId = albums[i].id;
//             break;
//         }
//     }

//     const songs = await Album.findAll({
//         include: [{ model: Song, as: "songs", required: true, attributes: ["track_num", "name"]}],
//         where: {
//             id: albumId,
//         }
//     })

//     res.json(songs[0].songs);
// }))

module.exports = router;
