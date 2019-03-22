// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require("express");
const helmet = require("helmet");

const projectRoutes = require("./routers/projectRoutes");
const actionRoutes = require("./routers/actionRoutes");
const app = express();

app.use(express.json());
app.use(helmet());

app.get("/", (req, res) =>
  res.send("<h1>Sprint Challenge: Express and Node.js</h1>")
);
app.use("/api/projects", projectRoutes);
app.use("/api/actions", actionRoutes);

const port = process.env.PORT || 6500;

app.listen(port, () => console.log(`Server running on ${port}`));
