const express = require("express");
const projectDb = require("../data/helpers/projectModel");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const projects = await projectDb.get();
      res.status(200).json(projects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't retrieve the projects." });
    }
  })
  .post(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .json({ error: "New project must have a name and a description." });
    try {
      const newProject = await projectDb.insert(req.body);
      const projects = await projectDb.get();
      res.status(201).json(projects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't add a new project at this time." });
    }
  });

router.route("/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await projectDb.remove(id);
    if (deleted === 0)
      return res
        .status(404)
        .json({ error: "There isn't a project with that id" });
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Sorry, we couldn't delete that project." });
  }
});

module.exports = router;
