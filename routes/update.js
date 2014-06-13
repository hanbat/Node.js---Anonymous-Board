var express = require('express');
var router = express.Router();
var orm = require('orm');

var $ = require('jquery');

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

	sequelize.query('select * from boards where id=' + req.params.id + ';').success(function(project){

		title = project[0].title;
		nickname = project[0].nickname;
		content = project[0].content;


		res.render('update.ejs', {title:title, nickname: nickname, content: content, id:req.params.id});

	});


});


router.post('/', function(req, res){

	var redirect = '/read/'+ req.body.id;


	console.log(redirect);

	Board.find({where: {id: req.body.id}}).on('success', function(object){

		if(object){
			object.updateAttributes({
				title: req.body.title,
				nickname: req.body.nickname,
				content: req.body.content
			}).on('success',function(){
				// alert('Success!');
				console.log("Updated successfully!");
			});
		}
	});

	// res.send("http://www.google.ca");
	// res.render('read', {id: tmp_id});
});


module.exports = router;