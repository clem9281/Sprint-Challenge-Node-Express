// check the body for a name and description
function checkBody(req, res, next) {
  const { description, name } = req.body;
  if (!name || !description)
    return res
      .status(400)
      .json({ error: "New project must have a name and a description." });
  next();
}

module.exports = checkBody;
