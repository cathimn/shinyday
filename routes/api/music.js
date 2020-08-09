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

const { Artist, Album, Song } = require('../../db/models')

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

router.get('/:artistTerm', asyncHandler(async (req, res) => {
    const { artistTerm } = req.params;
    const artists = await Artist.findAll({
        attributes: ["id", "artist_name"]
    });
    const matches = artists.filter(ele => {
        let name = ele.artist_name;
        name = name.toLowerCase();
        name = name.replace(regex, "");
        return (name === artistTerm) ? name : null;
    })
    if (matches.length > 0) {
        res.json(...matches);
    } else {
        res.json(false);
    }
}));

router.post('/tracklist', asyncHandler(async (req, res) => {
    const { searchId } = req.body;
    const tracklist = await Album.findOne({
        where: {
            id: {[Op.eq]: searchId}
        },
        include: [{model: Song, as: "songs", attributes: ["name"]}],
        attributes: ["name"] });
    res.json(tracklist.songs.map(ele => ele.name))
}));

router.post('/songfiles', asyncHandler(async (req, res) => {
    const { prefix } = req.body;
    const fullPrefix = `artists/${prefix}`
    const response = await s3.listObjectsV2({
        Bucket: 'shinyday',
        Prefix: fullPrefix,
        Delimiter: ".mp3"
    }).promise();
    const songUrls = response.CommonPrefixes.map(ele => ele.Prefix)
    res.json(songUrls);
}))

router.post('/songnames', asyncHandler(async (req, res) => {
    const { album } = req.body;
    let albumId = null;

    const albums = await Album.findAll({
        attributes: ["id", "name"]
    });

    for (let i = 0; i < albums.length; i++) {
        if ((albums[i].name).toLowerCase().replace(regex, "").includes(album)) {
            albumId = albums[i].id;
            break;
        }
    }

    const songs = await Album.findAll({
        include: [{ model: Song, as: "songs", required: true, attributes: ["track_num", "name"]}],
        where: {
            id: albumId,
        }
    })

    res.json(songs[0].songs);
}))

router.get('/discography/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const albums = await Album.findAll({
        attributes: ["name"],
        where: {
            artist_id: id,
        }
    })
    const array = albums.map(ele => ele.name)

    res.json(array);
}));

module.exports = router;
