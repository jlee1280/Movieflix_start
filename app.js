/*
//  Your name and student #: Jimmy (Jeong Hoon) Lee, A01064259
 (Make sure you also specify on the Google Doc)
*/
const fs = require("fs");
const express = require("express");

let app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");

var userName = "Jimmy";
var myMovieList = ["Inception", "Spiderman", "The Dark Knight", "Tenet"];

app.get("/", (req, res) =>
  res.render("pages/index", {
    myMovieList,
    userName,
  })
);

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("myForm", (req, res) => {
  let form = req.body;
  let myMovieList = form.text.split(",");
  res.render("pages/index", { myMovieList: myMovieList });
});

app.get("/myListQueryString", (req, res) => {
  let { movie1, movie2 } = req.query;
  myMovieList = [movie1, movie2];
  res.redirect("/");
});

app.get("/search/:movieName", (req, res) => {
  let myMovieName = req.params.movieName;
  console.log(myMovieName);
  fs.readFile("movieDescriptions.txt", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let myMovies = data.toString().split("\n");
      for (movie of myMovies) {
        console.log(movie);
        var names = movie.toLowerCase();
        if (names.includes(myMovieName)) {
          let [name, description] = movie.split(":");
          res.render("pages/searchResult", { name, description });
        } else {
          res.render("pages/searchResult", {
            name: "Movie could not be found",
            description: "...",
          });
        }
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});
