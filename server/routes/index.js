const router = require('express').Router();
const controller = require('../controllers');

router.get('/albumsByArtist/:artistId', controller.albumsByArtist.getAll);
router.get('/epswithartist/:artistId', controller.albumsByArtist.getAll);
router.get('/compilationswithartist/:artistId', controller.albumsByArtist.getAll);
router.get('/albumswithartist/:artistId', controller.albumsByArtist.getAll);



module.exports = router;