'use strict';

var path      = require('path');

module.exports = function( grunt ) {
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		/*
		 * Copy files to a temp dir
		 */
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd:    'site/',
						src:    ['**'],
						dest:   'dist/'
					}
				]
			},
			
		},

		/*
		 * Optimize modules using requirejs
		 */
		requirejs: {
			build: {
				options: {
					baseUrl:                 'site',
					mainConfigFile:          'site/js/app.js',
					name:                    'app',
					out:                     'dist/js/app.js',
					logLevel:                0,
					optimize:                'uglify',
					optimizeCss:             'none',
					removeCombined:          true,
					preserveLicenseComments: false,
					findNestedDependencies:  true,
				}
			}
		},

		/*
		 * Remove the temp & build directories
		 */
		clean: {
			// build: { src: [''] },
			scripts: { src: [
				'dist/js/routes',
				] }
		},

	});


	/*
	 * Tasks!
	 * Run `grunt [task]` from the project root directory.
	 */
	grunt.registerTask( 'default', ['copy', 'requirejs', 'clean'] );

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
};