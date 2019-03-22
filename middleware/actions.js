const projectDb = require("../data/helpers/projectModel");

async function checkBodyAndProjectId(req, res, next) {
  const { project_id, description, notes } = req.body;
  // need to have project_id, description and notes to add an action
  if (!project_id || !description || !notes)
    return res.status(400).json({
      error:
        "To add an action you must have a project_id, a description, and notes"
    });
  // check to see if the project id exists
  try {
    const project = await projectDb.get(project_id);
  } catch (error) {
    return res.status(400).json({
      error: "We can't add an action to a project that doesn't exist"
    });
  }
  next();
}

module.exports = checkBodyAndProjectId;
