var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    let isPossible = true;

    console.log(req.body);

    let recv_movie_title = req.body.movie_title;
    let recv_movie_cast = req.body.movie_cast;
    let recv_movie_genre = req.body.movie_genre;
    let recv_poster_location = req.body.poster_location;
    let recv_stars = req.body.rank;

    if (recv_movie_title == "" || recv_movie_cast == "" || recv_movie_genre == "" || recv_poster_location == "") isPossible = false;
    if (isPossible) {
        res.render('result', {
            movie_title: recv_movie_title,
            movie_cast: recv_movie_cast,
            movie_genre: recv_movie_genre,
            poster_location: recv_poster_location,
            stars: recv_stars
        });
    } else {
        // 하나라도 누락되거나 경로가 잘못된 경우
        let err = "하나라도 누락되거나 경로가 잘못된 경우";
        res.render('error', { error: err });
    }
});

module.exports = router;