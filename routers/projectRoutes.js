const express = require("express");
const projectDb = require("../data/helpers/projectModel");
const checkBody = require("../middleware/projects");
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
  .post(checkBody, async (req, res) => {
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

router
  .route("/:id")
  .delete(async (req, res) => {
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
      res
        .status(500)
        .json({ error: "Sorry, we couldn't delete that project." });
    }
  })
  .put(checkBody, async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await projectDb.update(id, req.body);
      if (!updated)
        return res
          .status(404)
          .json({ error: "There is not project with that id number" });
      const projects = await projectDb.get();
      res.status(200).json(projects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't edit that post at this time." });
    }
  });

module.exports = router;
