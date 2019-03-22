const express = require("express");
const projectDb = require("../data/helpers/projectModel");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry, we couldn't retrieve the projects." });
  }
});

module.exports = router;
