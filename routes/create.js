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
	
	title: Sequelize.STRING,
	nickname: Sequelize.STRING,
	content: Sequelize.STRING,
	ip_address: Sequelize.STRING,

});

router.get('/', function(req, res){

	res.render('create');

});


router.post('/', function(req, res){
	Board.create({
		title: req.body.title,
		nickname: req.body.nickname,
		content: req.body.content,
		ip_address: req._remoteAddress
	}).success(function(sdepold){
		console.log(sdepold.values);
	});

	console.log('DB is UPDATED');

});


module.exports = router;