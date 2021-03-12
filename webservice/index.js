require("dotenv").config({ path: "process.env" });
const request = require("request");
const express = require("express");
const app = express();
const port = 3000;

// Serve static files from a directory
app.use(express.static('../webapp/dist'));


// Search for movies by title
app.get("/movies", (req, res) => {
  var search = req.query.search;
  console.log(search);

  // Check for no query
  if (!search) {
    res.send([]);
    return;
  }
  var url = `https://api.themoviedb.org/3/search/movie?region=US&language=en-US&page=1&include_adult=false&api_key=${process.env.API_KEY}&query=${search}`;

  // Search using TMDB API
  request(url, { json: true }, (err, movies) => {
    var response_list = [];

    // Loop through every movie, up to ten
    for (var i = 0; i < 10 && i < movies.body.results.length; i++) {
      // Build the response
      var movie = movies.body.results[i];
      var response_movie = {
        movie_id: movie.id,
        title: movie.title,
        poster_image_url: "image.tmdb.org/t/p/w500" + movie.poster_path,
        popularity_summary: `${movie.vote_average * 10}% out of ${
          movie.vote_count
        } votes`,
      };
      response_list.push(response_movie);
    }

    // Send the response back
    res.send(response_list);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
