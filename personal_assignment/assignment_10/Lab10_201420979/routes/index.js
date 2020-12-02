const User = require('../models/person');

var express = require('express');
 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add',function(req, res, next) {
  const user = new User({
    name : req.body.name
  });
  user.save((err)=>{
    res.redirect('/list');
  });
  
});
router.get('/list', (req, res, next)=>{
  User.find({}).then( (people)=>{
    res.render('list', {people : people});
  }).catch((err)=>{
    console.log(err);
  });
});

router.get('/search', (req,res,next)=>{
  res.render("search");
});

router.get('/edit/:id', (req, res, next)=>{
  console.log(req.params.id);
  User.findById(req.params.id ).then((person)=>{
    res.render('edit', {person : person});
  }).catch((err)=>{
    console.log(err);
  });
});

router.get('/delete/:id', (req, res, next)=>{
  User.deleteOne({_id : req.params.id}).then((result)=>{
    res.redirect("/list");
  });
});
router.post('/update/:id', (req,res,next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, (err, person)=>{
    res.redirect('/list');
  });
});

router.post('/searchrequest', function(req, res, next){
  User.find(req.body,(err, people)=>{
    res.render('list', {people: people});
  });
});
module.exports = router;
