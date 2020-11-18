const User = require('../models/person');

var express = require('express');
 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}).then( (people)=>{
    console.log(people);
    res.render('index', { title: 'Express', people : people});
  });
});


router.post('/add',function(req, res, next) {
  console.log(req.body.name);
  const user = new User({
    name : req.body.name
  });
  user.save((err, result)=>{
    let save_result = result;
    
    var response = {
        name : user.name, 
        id : save_result._id
    }
    console.log(response);
    res.status(200).json(response);

  });
  
});



router.get('/search', (req,res,next)=>{
  User.find({},(err, people)=>{
    res.render("search",  {people: people});
  });
});

router.post('/delete/:id', (req, res, next)=>{
  console.log(req.params.id);
  User.deleteOne({_id : req.params.id}).then((result)=>{
    var response = {
      success : true
    }
    res.status(200).json(response);
  }).catch((err)=>{
    var response = {
      success : false
    }    
    res.status(500).json(response);
  });
});


router.post('/update/:id', (req,res,next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, (err, person)=>{
      res.status(200).json({person : person});
  });
});

router.post('/searchrequest', function(req, res, next){
  User.find(req.body).then((people)=>{
    let data = {
      success : true,
      people : people
    }
    res.status(200).json(data);
  }).catch((err)=>{
    let data = {
      success : false
    }
    res.status(500).json(data);
  });
});
module.exports = router;
