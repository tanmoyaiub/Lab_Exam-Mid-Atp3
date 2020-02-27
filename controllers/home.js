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
		res.render('home/index' , {user: result});
	});
});

router.get('/view_users' , function(req , res){

	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/view_users' , {userlist: results});
		}else{
			res.redirect('/home');
		}
		
	});
});

router.get('/myprofile', function(req, res){
	
	userModel.getByUname(req.cookies['username'] , function(result){
		res.render('home/myprofile' , {user: result});
	});
});


router.get('/editProfile/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/editProfile', {user: result});
	});
});

router.post('/edit/:id' , function(req , res){
	var user = {
		id: req.params.id , 
		username: req.body.username ,
		password: req.body.password ,
		
	};

	userModel.update(user , function(status){
		if(status){
			res.redirect('/home/myprofile')
		}else{
			res.redirect('/home/editProfile/' + req.params.id);
		}
	});

});



router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id' , function(req , res){
	var user = {
		id: req.params.id , 
		username: req.body.username ,
		password: req.body.password ,
		
	};

	userModel.update(user , function(status){
		if(status){
			res.redirect('/home/view_users')
		}else{
			res.redirect('/home/edit/' + req.params.id);
		}
	});

});

router.get('/delete/:id' , function(req , res){
	userModel.delete(req.params.id , function(status){
		if(status){
			console.log("Deleted Successfully!");
			res.redirect('/home/view_users');
		}else{
			res.redirect('/home/view_users/' + req.params.id);
		}
	});
});

router.get('/addusers' , function(req , res){
	res.render('home/register');
});


router.post("/addusers" , function(req , res){
	var user = {
		id: req.params.id ,
		username: req.body.username ,
		password: req.body.password ,
		type: 	  req.body.type
	};

	userModel.insert(user , function(status){
		//where the 'user' comes from??
		if(status){
			res.redirect('/home/view_users')
		}else{
			res.redirect('/home/addusers/' + req.params.id)
		}
	})
})


module.exports = router;