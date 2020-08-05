const express = require('express');
const asyncHandler = require('express-async-handler');

const GenreRepository = require('../../db/genre-repository');

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const genres = await GenreRepository.list();
    res.json(genres);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const genre = await GenreRepository.one(req.params.id);
    res.json(genre);
}))

module.exports = router;