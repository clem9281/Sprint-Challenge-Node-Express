const express = require("express");
const actionDb = require("../data/helpers/actionModel");
const projectDb = require("../data/helpers/projectModel");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const actions = await actionDb.get();
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ error: "Sorry, we couldn't find the actions." });
    }
  })
  .post(async (req, res) => {
    try {
      // need to have project_id, description and notes to add an action
      const { project_id, description, notes } = req.body;
      if (!project_id || !description || !notes)
        return res.status(400).json({
          error:
            "To add an action you must have a project_id, a description, and notes"
        });
      // there doesn't seem to be anything stopping the helper from adding an action to a project that doesn't exist, so we have to check for that here
      const projects = await projectDb.get();
      if (!projects.find(project => project.id === project_id))
        return res.status(400).json({
          error: "We can't add an action to a project that doesn't exist"
        });
      const newAction = await actionDb.insert(req.body);
      res.status(201).json(newAction);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't add an action at this time" });
    }
  });

router.route("/:projectId").get(async (req, res) => {
  const { projectId } = req.params;
  try {
    const actions = await projectDb.getProjectActions(projectId);
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: "Sorry, we couldn't find those actions" });
  }
});

module.exports = router;
