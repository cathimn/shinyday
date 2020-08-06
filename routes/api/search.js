const asyncHandler = require('express-async-handler');
const { Song, Artist, Album } = require('../../db/models');
const router = require('express').Router();

router.get('/', asyncHandler(async (req, res) => {
    
    const searchArray = await Artist.findAll({
        include: [{ model: Album, as: "albums", required: true, attributes: ["id", "name"],
                include: [{ model: Song, as: "songs", required: true, attributes: ["id", "name"] }]}],
        attributes: [ "id", "artist_name"]});
    const search = new Object();
    let id = 0;
    // searchArray.forEach(ele => {
    //     const artistName = ele.artist_name;
    //     ele.albums.forEach(ele => {
    //         const albumName = ele.name;
    //         ele.songs.forEach(ele => {
    //             search[id] = {
    //                 song: ele.name,
    //                 album: albumName,
    //                 artist: artistName,
    //             };
    //             id++;
    //         })
    //         search[id] = {
    //             album: albumName,
    //             artist: artistName,
    //         }
    //         id++;
    //     })
    //     search[id] = {
    //         artist: artistName
    //     }
    //     id++;
    // })

    const albArtSearch = await Artist.findAll({
        include: [{ model: Album, as: "albums", required: true, attributes: ["id", "name"] }],
        attributes: ["id", "artist_name"],
    })
    albArtSearch.forEach(ele => {
        const artistName = ele.artist_name;
        ele.albums.forEach(ele => {
            search[id] = {
                album: ele.name,
                artist: artistName,
            }
            id++;
        })
        search[id] = {
            artist: artistName,
        };
        id++;
    })
    res.json(search)
}));

module.exports = router;