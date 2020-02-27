var express = require('express');
var router	= express.Router();
var userModel		= require.main.require('./models/user-model');


router.get('*' , function(req , res , next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	
	userModel.getByUname(req.cookies['username'] , function(result){
		res.render('home3/index' , {user: result});
	});
});

router.get('/myprofile', function(req, res){
	
	userModel.getByUname(req.cookies['username'] , function(result){
		res.render('home3/myprofile' , {user: result});
	});
});

router.get('/editProfile/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home3/editProfile', {user: result});
	});
});

router.post('/editProfile/:id' , function(req , res){
	var user = {
		id: req.params.id , 
		username: req.body.username ,
		password: req.body.password ,
		
	};

	userModel.update(user , function(status){
		if(status){
			res.redirect('/home3/myprofile')
		}else{
			res.redirect('/home3/editProfile/' + req.params.id);
		}
	});

});

router.get('/approve_info' , function(req , res){

	userModel.ApproveInfo_User(function(results){
		if(results.length > 0){
			res.render('home3/approve_info' , {userlist: results});
		}else{
			res.redirect('/home3');
		}
		
	});
});


module.exports = router;