const express = require("express");
const actionDb = require("../data/helpers/actionModel");
const projectDb = require("../data/helpers/projectModel");
const checkBodyAndProjectId = require("../middleware/actions");
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
  .post(checkBodyAndProjectId, async (req, res) => {
    try {
      const newAction = await actionDb.insert(req.body);
      res.status(201).json(newAction);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't add an action at this time" });
    }
  });

router
  .route("/:actionId")
  .delete(async (req, res) => {
    const { actionId } = req.params;
    try {
      const deleted = await actionDb.remove(actionId);
      if (deleted === 0)
        return res
          .status(404)
          .json({ error: "There is no action at that id to delete" });
      const projects = await actionDb.get();
      res.status(200).json(projects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't delete that action at this time" });
    }
  })
  .put(checkBodyAndProjectId, async (req, res) => {
    const { actionId } = req.params;
    try {
      const updated = await actionDb.update(actionId, req.body);
      if (!updated)
        return res
          .status(404)
          .json({ error: "There is not action at that id" });
      const actions = await actionDb.get();
      res.status(200).json(actions);
    } catch (error) {
      res
        .status(500)
        .json({ error: "We couldn't update that action right now" });
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
