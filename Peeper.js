var exec = require('child_process').exec;
var fs = require('fs');

/* Properties
***************/
var config        = {};
var watched_files = {};

config['less/'] = [{
      src: 'less/main.less',
      target: 'css/main.css'
    }];

/* Methods
/*************/
var get = function(prop_str){

  if(typeof prop_str === 'string'){

      return config[prop_str];
  }

  if(typeof prop_str === 'undefined'){

      return config;
  }

  return false;
};

var _doLESS = function(element, index, array){

  exec('lessc ' + element.src + ' ' + element.target, function(error, stdout, stderr){

    if(error === null){

      console.log('compiled CSS file %s from LESS at %s', element.target, element.src);
    } else {

      console.log(stderr);
    }
  });
};

var watch = function(path, obj_list){

  if(typeof obj_list === 'object' && obj_list.length > 0){

    config[path] = obj_list;
  };

  return config;
};

var peep = function(path, callback){

  path = (typeof path === 'undefined' && typeof callback === 'undefined') ? '*' : path;

  if(path === '*'){

    for(item in config){

      watched_files[item] = fs.watch(item, function(event, filename){

          config[item].forEach(_doLESS);
      });
    }

  } else {

    watched_files[path] = fs.watch(path, function(event, filename){

        config[path].forEach(_doLESS);
    });
  }


  return watched_files;
};

var kill = function(name, callback){

  if(typeof name === "string" && typeof watched_files[name] !== 'undefined'){

      watched_files[name].close();
  } else {

    console.log("Can't determine what " + name + " is, so killing all watched files");

    for(item in watched_files){

      watched_files[item].close();
    }
  }

  if(typeof callback === 'function'){

    callback();
  }
};

exports.get         = get;
exports.watch       = watch;
exports.peep        = peep;
exports.kill        = kill;