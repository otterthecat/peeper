var exec = require('child_process').exec;
var fs = require('fs');

/* Properties
***************/
var options = {

  watch: "less/",
  files: [{
      src: 'less/main.less',
      target: 'css/main.css'
    }]
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

var _doLESS = function(element, index, array){

  exec('lessc ' + element.src + ' ' + element.target, function(error, stdout, stderr){

    if(error === null){

      console.log('compiled CSS file %s from LESS at %s', element.target, element.src);
    } else {

      console.log(stderr);
    }
  });
}

var peep = function(callback){

  watchedFiles[options.watch] = fs.watch(options.watch, function(event, filename){

      options.files.forEach(_doLESS);
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