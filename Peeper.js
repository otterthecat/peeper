var exec = require('child_process').exec;
var fs = require('fs');

var options = {

	less: {src: 'less/main.less', target: 'css/main.css'}
}


var config = function(obj){

	for(item in obj){

		options[item] = obj[item];
	}
}

var peep = function(callback){

	fs.watch(options.less.src, function(event, filename){

		exec('lessc ' + options.less.src + ' ' + options.less.target, function(error, stdout, stderr){


			console.log('_____ compiled less via Peeper');
		});
		callback(event, filename);
	});
}


exports.config = config;
exports.peep = peep;