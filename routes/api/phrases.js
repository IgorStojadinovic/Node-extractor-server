const express = require("express");
const router = express.Router();
const path = require("path");
const phrasesController = require("../../controllers/phrasesController");

router
  .route("/")
  .get(phrasesController.getAllPhrases)


module.exports = router;