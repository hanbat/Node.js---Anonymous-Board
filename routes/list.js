var express = require('express');
var router = express.Router();
var orm = require('orm');
var app = express();

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

// sequelize.sync().success(function(){
// 	Board.create({
// 		title: "letsseae",
// 		nickname: "tesater",
// 		content: "trialsdfsdfsd",
// 		ip_address: "192.123.232.13"
// 	}).success(function(sdepold){
// 		console.log(sdepold.values);
// 	});
// });


router.get('/', function(req, res){

	var result = [];

	sequelize.query('select * from boards;').success(function(project){


		result = project;
		// console.log(project);
		// console.log(result);

		for (var item in project){

			// console.log(project[item].title);
			// data += '<tr><td>'+project[item].nickname+'</td><td>' + project[item].title+ '</td><td>' + project[item].ip_address+ '</td></tr>';

			// console.log(data);

		}


		var data = {
			title: "Results:",
			users: [
				{name: "Ted"},
				{name: "Peter"}
			]
		};

		data['result'] = project;

		console.log(data);

		res.render('index.ejs', data);

	});

});

module.exports = router;