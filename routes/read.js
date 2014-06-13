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
	
	title: Sequelize.STRING,
	nickname: Sequelize.STRING,
	content: Sequelize.STRING,
	ip_address: Sequelize.STRING,

});

router.get('/', function(req, res){

	res.send('temporary page for read');

});

router.get('/:id', function(req, res){

	// console.log(req.params.id);

	var title = '',
		nickname = '',
		content = '';

	sequelize.query('select * from boards where id=' + req.params.id + ';').success(function(project){

		title = project[0].title;
		nickname = project[0].nickname;
		content = project[0].content;

		// console.log(title);
		// console.log(nickname);
		// console.log(content);

		res.render('read.ejs', {title:title, nickname: nickname, content: content, id:req.params.id});

	});

	// res.send('temporary page for read' + title + nickname + content);
});


module.exports = router;