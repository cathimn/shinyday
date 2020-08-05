const { Album } = require('./models');

async function one(id) {
    return await Album.findByPk(id)
}