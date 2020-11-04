var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    //console.log(res);
    let recv_movie_title = "Begin Again";
    let recv_movie_cast = "Mark Ruffalo, Keira Knightley";
    let recv_movie_genre = "Melodrama";
    let recv_poster_location = "";
    let recv_stars = 3;
    res.render('result', {
        movie_title: recv_movie_title,
        movie_cast: recv_movie_cast,
        movie_genre: recv_movie_genre,
        poster_location: recv_poster_location,
        stars: recv_stars
    });
});

module.exports = router;