const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign.controller');

// POST /api/campaign/generate
router.post('/generate', campaignController.generate);

// POST /api/campaign/regenerate
router.post('/regenerate', campaignController.regenerate);

module.exports = router;
