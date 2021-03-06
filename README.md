Peeper
======

It's watching you...
Well, ok, not you specifically, but it can watch your LESS files and automatically compile them for you.

Caveats
-------

Since Peeper makes use of Node's fs.watch() method, it is bound by the same issues that are listed [here](http://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener)


Usage
-----

Using Peeper is pretty straightforward:

	var p = require('./Peeper');

	// this will by default watch a directory named 'less', look for file 'less/main.less',
	// and compile a CSS file to 'css/main.css'
	p.peep();

	// this will stop watching the directory for any changes
	p.kill();

You can customize the defaults like so:

	var p = require('./Peeper');

	// first argument is the file you want to watch,
	// second argument is an array of objects, each storing
	// the source ('src') and target paths
	p.set('myDirectory', [{
				src: 'myDirectory/myLess.less',
				target: 'myDirectory/myCSS.css'
			}]
		});

	// this will now watch a directory named 'myDirectory', look for file 'myDirectory/myLESS.less',
	// and compile a CSS file to 'myDirectory/myCSS.css'
	p.peep();

	// to stop watching, use the .kill() method
	p.kill();

	// optionally, you can pass the watched file if you are watching mulitple files
	// no argument will stop watching ALL processes
	p.kill('myDirectory');
