const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { User_Follow, User, Artist } = require('../../db/models');


router.post('/new', asyncHandler(async (req, res) => {
    const { user_id, artist_id } = req.body;

    const newFollow = User_Follow.build({
        user_id,
        artist_id,
    })

    await newFollow.save();
}));

router.post('/remove', asyncHandler(async (req, res) => {
    const { user_id, aritst_id } = req.body;

    const currentFollow = await User_Follow.findOne({
        where: {
            user_id,
            aritst_id,
        }
    })

}))

router.get('/:artistId', asyncHandler(async (req, res) => {
    const follows = await User_Follow.findOne({
        where: {
            artist_id: req.params.artistId
        }
    })

    res.json(follows.length);
}));


router.get('/:username', asyncHandler(async (req, res) => {
    const {username} = req.params;

    const userId = await User.findOne({
        where: {
            "username": username
        },
        attributes: ["id"]
    })

    const follows = await User.findAll({
        include: [{model: Artist}],
        where: {
            id: userId.id
        },
        attributes: []
    })

    const test = follows[0].Artists.map(ele => {
        const obj = {};
        obj.id = ele.id;
        obj.artist = ele.artist_name;
        return obj;
    })

    res.json(test)
}));

module.exports = router;
