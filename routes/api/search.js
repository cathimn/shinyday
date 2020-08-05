const asyncHandler = require('express-async-handler');
const { Song, Artist, Album } = require('../../db/models');
const router = require('express').Router();

router.get('/', asyncHandler(async (req, res) => {
    const { query } = req.body;
    // console.log(req.body)
    const searchArray = await Artist.findAll({
        include: [{model: Album, as: "albums", required: true, attributes: ["id", "name"],
                include: [{ model: Song, as: "songs", required: true, attributes: ["id", "name"] }]}],
        attributes: [ "id", "artist_name"]});
    const search = new Object();
    searchArray.forEach(ele => {
        const artistId = ele.id;
        const artistName = ele.artist_name;
        ele.albums.forEach(ele => {
            const albumId = ele.id;
            const albumName = ele.name;
            ele.songs.forEach(ele => {
                search[`${artistId}${albumId}${ele.id}`] = {
                    song: ele.name,
                    album: albumName,
                    artist: artistName,
                };
            })
        })
    })
    res.json(search)
}));

// return filepath for what you clicked in search
// router.get('/:type/:id', asyncHandler(async (req, res) => {
//     const { type, id } = req.params;
// }))

module.exports = router;