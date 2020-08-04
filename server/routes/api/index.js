const router = require('express').Router();

const routes = ['session', 'user'];

for (let route of routes) {
    router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;