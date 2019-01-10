// imports
const express = require("express");
var cors = require("cors");
// db
const db = require("./data/dataConfig");
// instantiate server
const server = express();
server.use(express.json());
server.use(cors());

// post user
server.post("/users", (req, res) => {
  const user = req.body;
  db("users")
    .insert({
      username: user.lockUsername,
      email: user.lockEmail,
      email_verified: user.lockEmail_verified
    })
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get users
server.get("/users", (req, res) => {
  db("users")
    .then(users => res.status(200).json(users))
    .catch(err => {
      res.status(500).json(err);
    });
});

// get user
server.get("/users/:email", (req, res) => {
  const { email } = req.params;
  db("users")
    .where({ email })
    .then(results => {
      if (results.length == 0) {
        res.status(404).json("User does not exist.");
      } else {
        res.status(200).json(results[0]);
      }
    })
    .catch(err => res.status(500).json(err));
});

// get all specific user reviews
server.get("/users/:email/reviews", (req, res) => {
  const { email } = req.params;
  db("reviews")
    .where({ user_email: email })
    .then(results => {
      res.status(200).json(results);
    });
});

// get review for specific movie from specific user
server.get("/users/:email/movie/:id", (req, res) => {
  const { email, id } = req.params;
  db("reviews")
    .where({ user_email: email, movie_id: id })
    .then(reviews => {
      res.status(200).json(reviews[0]);
    })
    .catch(err => {
      res.status(500).json({ error: "Data could not be retrieved" });
    });
});

// get reviews
server.get("/reviews", (req, res) => {
  db("reviews")
    .then(reviews => res.status(200).json(reviews))
    .catch(err => {
      res.status(500).json(err);
    });
});

//get reviews for specific movie
server.get("/reviews/:id", (req, res) => {
  const { id } = req.params;
  db("reviews")
    .where({ movie_id: id })
    .then(reviews => {
      let story_average = 0;
      let audio_average = 0;
      let visuals_average = 0;
      let characters_average = 0;
      let dialogue_average = 0;
      let final_score = 0;
      for (let i = 0; i < reviews.length; i++) {
        user_reviews = reviews[i];
        story_average += user_reviews.story;
        audio_average += user_reviews.audio;
        visuals_average += user_reviews.visuals;
        characters_average += user_reviews.characters;
        dialogue_average += user_reviews.dialogue;
      }
      story_average = story_average / reviews.length;
      audio_average = audio_average / reviews.length;
      visuals_average = visuals_average / reviews.length;
      characters_average = characters_average / reviews.length;
      dialogue_average = dialogue_average / reviews.length;
      final_score =
        (story_average +
          audio_average +
          visuals_average +
          characters_average +
          dialogue_average) /
        5;
      let results = {
        story_average,
        audio_average,
        visuals_average,
        characters_average,
        dialogue_average,
        final_score
      };
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// post review
server.post("/reviews", (req, res) => {
  const review = req.body;
  db("reviews")
    .insert({
      user_email: review.user_email,
      movie_id: review.movie_id,
      story: review.story,
      audio: review.audio,
      visuals: review.visuals,
      characters: review.characters,
      dialogue: review.dialogue
    })
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// put review
server.put("/users/:email/movie/:id", (req, res) => {
  const { email, id } = req.params;
  const changes = req.body;
  db("reviews")
    .where({ user_email: email, movie_id: id })
    .update({
      story: changes.story,
      audio: changes.audio,
      visuals: changes.visuals,
      characters: changes.characters,
      dialogue: changes.dialogue
    })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// server port
const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
