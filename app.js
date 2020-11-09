const express = require("express");
const morgan = require("morgan");
const playstoreapps = require("./playstore.js");

const app = express();
const cors = require("cors");

app.use(morgan("common")); // let's see what 'common' format looks like
app.use(cors());

app.get("/apps", (req, res) => {
  const { sort = "", genres = "" } = req.query;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be one of title or rank");
    }
  }

  if (genres) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      return res
        .status(400)
        .send(
          "Genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'"
        );
    }
  }
  let results = playstoreapps.filter((playapp) =>
    playapp.Genres.toLowerCase().includes(genres.toLowerCase())
  );


  if (sort) {
    let keysort = req.query.sort
    results.sort((a, b) => {
      return a[keysort] > b[keysort] ? 1 : a[keysort] < b[keysort] ? -1 : 0;
    });
  }

  res.json(results);
});

module.exports = app;