// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(helmet());

app.get("/", (req, res) =>
  res.send("<h1>Sprint Challenge: Express and Node.js</h1>")
);

const port = process.env.PORT || 6500;

app.listen(port, () => console.log(`Server listening on port ${port}`));
