const { Genre, Album } = require('./models');

async function one(id) {
    // find all albums by genre pk
    return await Genre.findByPk(id, {
        include: [{ model: Album, as: "albums" , where: { genre_id: id } }],
    });
};

async function list() {
    return await Genre.findAll({
        attributes: [ 'id', 'genre' ]
    })
};

module.exports = {
    one,
    list,
}