const express = require ("express");
const router = express.Router();
const geminicontroller = require("../controllers/gemini")

router.route("/generate").post(geminicontroller.generateResponse);

module.exports = router;