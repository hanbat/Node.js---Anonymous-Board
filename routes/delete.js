var express = require('express');
var router = express.Router();
var orm = require('orm');


var Sequelize =  require('sequelize'),
	sequelize = new Sequelize('test', 'root', '',{

	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	native: true

});

var Board = sequelize.define('board', {
	
	id: Sequelize.INTEGER,
	title: Sequelize.STRING,
	nickname: Sequelize.STRING,
	content: Sequelize.STRING,
	ip_address: Sequelize.STRING,

});

router.get('/:id', function(req, res){

	console.log(req.params.id);
	// res.send('temporary page for update');

	Board.find({where: {id: req.params.id}}).on('success', function(object){

		object.destroy().on('success', function(u){

			if(u && u.deletedAT){
				console.log("delete SUCCESS!!");
			}
		});

	});

	res.redirect("/list");

});


router.post('/', function(req,res){

	var redirect = '/read/'+ req.body.id;


	console.log(redirect);

	Board.find({where: {id: req.body.id}}).on('success', function(object){

		if(object){
			object.updateAttributes({
				title: req.body.title,
				nickname: req.body.nickname,
				content: req.body.content
			}).success(function(){
			});
		}
	});

	// res.send("http://www.google.ca");
	// res.render('read', {id: tmp_id});
});
module.exports = router;