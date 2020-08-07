const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize')

const router = express.Router();

const { Artist, Album, Song } = require('../../db/models')

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

router.post('/songs', asyncHandler(async (req, res) => {
    const { searchId } = req.body;
    const tracklist = await Album.findOne({
        where: { id: {[Op.eq]: searchId} },
        include: [{model: Song, as: "songs", attributes: ["name"]}],
        attributes: ["name"] });
    res.json(tracklist.songs.map(ele => ele.name))
}));

module.exports = router;