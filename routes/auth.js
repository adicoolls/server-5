const express = require("express");
const router = express.Router();
const {handleUserSignup} = require("../controllers/auth");

router.post("/signup", handleUserSignup );

const {handleUserLogin} = require("../controllers/auth");

router.post("/login", handleUserLogin   );

module.exports = router;