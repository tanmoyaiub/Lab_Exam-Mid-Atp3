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
		res.render('home2/index' , {user: result});
	});
});

router.get('/myprofile', function(req, res){
	
	userModel.getByUname(req.cookies['username'] , function(result){
		res.render('home2/myprofile' , {user: result});
	});
});


router.get('/editProfile/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home2/editProfile', {user: result});
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
			res.redirect('/home2/myprofile')
		}else{
			res.redirect('/home2/editProfile/' + req.params.id);
		}
	});

});


router.get('/post' , function(req , res){
	res.render('home2/post');
});


router.post("/post" , function(req , res){
	var info = {
		id: req.params.id ,
		country: req.body.country ,
		place: req.body.place ,
		cost: req.body.cost 
		
	};

	userModel.insertforinfo(info , function(status){
		//where the 'user' comes from??
		if(status){
			res.redirect('/home2/req_info')
		}else{
			res.redirect('/home2/post')
		}
	})
})

router.get('/req_info' , function(req , res){

	userModel.InfogetAll(function(results){
		if(results.length > 0){
			res.render('home2/req_info' , {userlist: results});
		}else{
			res.redirect('/home2/req_info');
		}
		
	});
});

router.get('/approve_info' , function(req , res){

	userModel.ApproveInfo_Scout(function(results){
		if(results.length > 0){
			res.render('home2/approve_info' , {userlist: results});
		}else{
			res.redirect('/home2/post');
		}
		
	});
});



module.exports = router;