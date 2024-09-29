const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Files will be saved in the 'uploads' folder

const router = express.Router();
const jmski = require('../controller/jamirController');


router.get('/upload', jmski.upload);
router.get('/delete/:id', jmski.delete);
router.get('/create', jmski.create);
router.post('/creates', jmski.creates);
router.post('/savef', upload.single('file'), jmski.savef); // Apply multer middleware here

router.post('/addToPlaylist/:musicId', jmski.addToPlaylist);
router.get('/', jmski.index);
router.get('/:id', jmski.index);

// router.post('/removeFromPlaylist/:playlistId/:musicId', jmski.removeFromPlaylist);
// router.post('/deleteSong/:musicId', jmski.deleteSong);
module.exports = router;
