const express = require("express");
const router = express.Router();
const path = require("path");
const keywordsController = require("../../controllers/keywrodsController");

router
  .route("/")
  .get(keywordsController.getAllKeywords)


module.exports = router;