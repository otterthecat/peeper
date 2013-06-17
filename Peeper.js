var exec = require('child_process').exec;
var fs = require('fs');

/* Properties
***************/
var options = {

  less: {src: 'less/main.less', target: 'css/main.css'}
}

var watchedFiles = {};

/* Methods
/*************/
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

  watchedFiles[options.less.src] = fs.watch(options.less.src, function(event, filename){

      exec('lessc ' + options.less.src + ' ' + options.less.target, function(error, stdout, stderr){


        console.log('compiled CSS file %s from LESS at  %s', options.less.target, options.less.src);
      });

      if(typeof callback === 'function'){
      
        callback(event, filename);
      }
  });

  return watchedFiles;
}

var kill = function(name, callback){

  if(typeof name === "string" && typeof watchedFiles[name] !== 'undefined'){

      watchedFiles[name].close();
  } else {

    console.log("Can't determine what " + name + " is, so killing all watched files");

    for(item in watchedFiles){

      watchedFiles[item].close();
    }
  }

  if(typeof callback === 'function'){

    callback();
  }
}

exports.config      = config;
exports.get         = get;
exports.peep        = peep;
exports.kill        = kill;