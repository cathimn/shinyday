const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize')

const router = express.Router();

const { Artist, Album, Song } = require('../../db/models')

// api/music/latest returns 5 latest albums
// TODO not sure if orders by newest createdDate?
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

// find one artist GET
// api/music/:artistId or :artistName
router.get('/:artistId', asyncHandler(async (req, res) => {
    const { artistId } = req.params;
    const artist = await Artist.findOne({
        where: {
            id: artistId,
        }
    });


}));

// api/music/tracklist RETURNS THE TRACKLIST OF AN ALBUM BY ID
// TODO can i make this find by albumname too?
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

// api/music/discography RETURNS THE DISCOGRAPHY OF AN ARTIST
// search by ID? name? TODO
router.post('/discography', asyncHandler(async (req, res) => {

}));

module.exports = router;
