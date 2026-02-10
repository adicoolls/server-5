const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics, handleRedirect,} = require('../controllers/url');
const checkAuth = require("../middleware/auth");
const router = express.Router();

// tiny test route to ensure router is mounted and working
router.get('/test-route', (req, res) => res.json({ ok: true }));
router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleRedirect);

module.exports = router;