const express = require("express");
const actionDb = require("../data/helpers/actionModel");
const projectDb = require("../data/helpers/projectModel");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: "Sorry, we couldn't find the actions." });
  }
});

module.exports = router;
