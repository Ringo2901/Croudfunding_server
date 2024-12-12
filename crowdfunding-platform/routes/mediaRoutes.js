const express = require('express');
const multer = require('multer');
const MediaController = require('../controllers/MediaController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload/:projectId', upload.single('file'), MediaController.uploadMedia);

router.get('/project/:projectId', MediaController.getMediaByProjectId);

module.exports = router;
