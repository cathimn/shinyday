const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { User_Follow, User, Artist } = require('../../db/models');

router.post('/amfollowing', asyncHandler(async (req, res) => {
    const { username, artist_id } = req.body;

    const check = await Artist.findOne({
        include: [{model: User, attributes: ["username"]}],
        where: {
            id: artist_id,
        },
        attributes: []
    });
    let followStatus = false;
    for(let i = 0; i < check.Users.length; i++) {
        if (check.Users[i].username === username) {
            followStatus = true;
            break;
        }
    }
    res.json(followStatus);
}));

router.post('/new', asyncHandler(async (req, res) => {
    const { username, artist_id } = req.body;

    const user = await User.findOne({
        where: { username }
    });

    const user_id = await user.id;

    const newFollow = User_Follow.build({
        "artist_id": artist_id,
        "user_id": user_id,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    await newFollow.save();

    res.json(newFollow)
}));

router.delete('/', asyncHandler(async (req, res) => {
    const { username, artist_id } = req.body;

    const check = await Artist.findOne({
        include: [{model: User, attributes: ["username"]}],
        where: { id: artist_id },
        attributes: []
    });

    const user_id = check.Users.filter(ele => ele.username === username)[0].User_Follow.user_id;

    const entry = await User_Follow.findOne({
        where: {
            artist_id,
            user_id,
        }
    })

    await entry.destroy();

    res.json(":o(")
}))

router.get('/:username', asyncHandler(async (req, res) => {
    const { username } = req.params;

    const userId = await User.findOne({
        where: { "username": username },
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
