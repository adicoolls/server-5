const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics, handleRedirect, handleGetUserUrls, handleDeleteUrl} = require('../controllers/url');
const checkAuth = require("../middleware/auth");
const router = express.Router();

// tiny test route to ensure router is mounted and working
router.get('/test-route', (req, res) => res.json({ ok: true }));

// Specific routes FIRST (before parameter routes)
router.get("/user/urls", checkAuth, handleGetUserUrls);
router.get("/analytics/:shortId", checkAuth, handleGetAnalytics);

// Then generic routes
router.post("/", checkAuth, handleGenerateNewShortURL);
router.get("/:shortId", handleRedirect);

router.delete("/:shortId", checkAuth, handleDeleteUrl);

module.exports = router;