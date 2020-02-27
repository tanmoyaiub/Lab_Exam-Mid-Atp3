var db = require('./db');

module.exports= {
	getById: function(id , callback){
		var sql = "select * from user where id=?";
		db.getResults(sql , [id] , function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	InfogetAllforAdmin: function(callback){
		var sql = "select * from info where status=0";
		db.getResults(sql , null , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	ApproveInfo_Admin: function(callback){
		var sql = "select * from info where status=1";
		db.getResults(sql , null , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	ApproveInfo_Scout: function(callback){
		var sql = "select * from info where status=1";
		db.getResults(sql , null , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	ApproveInfo_User: function(callback){
		var sql = "select * from info where status=1";
		db.getResults(sql , null , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},



	InfogetAll: function(callback){
		var sql = "select * from info where status=0";
		db.getResults(sql , null , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql , null , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	validate: function(user, callback){
		var sql ="SELECT * FROM user where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},

	getByUname: function(username , callback){
		var sql = "select * from user where username=?";
		db.getResults(sql , [username] , function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	//its for scout to insert place information:
	insertforinfo: function(user , callback){
		//where the "user" comes from??
		var sql = "insert into info values(? , ? , ? , ? , ?)";
		db.execute(sql , [null , user.country , user.place , user.cost , 0] , function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},


	insert: function(user , callback){
		//where the "user" comes from??
		var sql = "insert into user values(? , ? , ? , ?)";
		db.execute(sql , [null , user.username , user.password , user.type] , function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

		updateApprove: function(id , callback){
		var sql = "update info set status=?  where id=?";
		db.execute(sql , [ 1 ,  id] , function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user , callback){
		var sql = "update user set username=? , password=?  where id=?";
		db.execute(sql , [user.username , user.password ,  user.id] , function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	deleteInfo: function(id , callback){
		var sql = "delete from info where id=?";
		db.execute(sql , id , function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(user , callback){
		var sql = "delete from user where id=?";
		db.execute(sql , [user] , function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}