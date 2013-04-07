var exec = require('child_process').exec;
var fs = require('fs');

var options = {

	less: {src: 'less/main.less', target: 'css/main.css'}
}


var config = function(obj){

	for(item in obj){

		options[item] = obj[item];
	}

	return this;
}

var get = function(prop_str){

	if(typeof prop_str === 'string'){

		return options[prop_str];
	}

	if(typeof prop_str === 'undefined'){

		return options;
	}

	return false;
}

var peep = function(callback){

	fs.watch(options.less.src, function(event, filename){

		exec('lessc ' + options.less.src + ' ' + options.less.target, function(error, stdout, stderr){


			console.log('compiled CSS file %s from LESS at  %s', options.less.target, options.less.src);
		});

		callback(event, filename);
	});
}


exports.config 		= config;
exports.get 		= get;
exports.peep 		= peep;