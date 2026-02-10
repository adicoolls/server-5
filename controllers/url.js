const URL = require('../models/url');
const bcrypt = require("bcrypt");
async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    // Generate a short id without external dependency
    const shortID = Math.random().toString(36).slice(2, 8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) return res.status(404).json({ error: 'Short URL not found' });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;
    console.log('handleRedirect called for', shortId);
    const result = await URL.findOne({ shortId });
    if (!result) return res.status(404).json({ error: 'Short URL not found' });

    // Record visit
    result.visitHistory.push({ timestamp: Date.now() });
    await result.save();

    // Redirect to original URL
    return res.redirect(result.redirectURL);
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.send("invalid password");

    }

    req.session.userId = user._id;

    res.redirect("/dashboard");


}

module.exports = {
    handleGenerateNewShortURL: handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleRedirect,
    handleUserLogin
}