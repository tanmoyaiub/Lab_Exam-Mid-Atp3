var express = require('express');
var userModel		= require.main.require('./models/user-model');
var router	= express.Router();



router.get('/' , function(req , res){
	res.render('login/index');
});


router.post('/' , function(req , res){

	var user = {
		username: req.body.uname ,
		password: req.body.password 
	}

	userModel.validate(user , function(status){
		if(status){
			if(status.type == "Admin"){
				res.cookie('username', req.body.uname);
				res.redirect('/home')
			}
			else if(status.type == "Scout"){
				res.cookie('username', req.body.uname);
				res.redirect('/home2')

			}

			else if(status.type == "General_User"){
				res.cookie('username', req.body.uname);
				res.redirect('/home3')

			}

			else{
				res.redirect('/login')
			}
			
		}else{
			res.send('invalid ')
		}
	})
});

router.get('/signup' , function(req , res){
	res.render('login/signup');
});

router.post("/signup" , function(req , res){
	var user = {
		id: req.params.id ,
		username: req.body.username ,
		password: req.body.password ,
		type: 	  req.body.type
	};

	userModel.insert(user , function(status){
		//where the 'user' comes from??
		if(status){
			//alert('Succesfully Registration!');
			res.redirect('/login')
		}else{
			res.redirect('/login/signup' )
		}
	})
})

module.exports = router;