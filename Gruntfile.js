/*
 * grunt-multi-stage-sourcemap
 * https://github.com/jchn/grunt-multi-stage-sourcemap
 *
 * Copyright (c) 2014 John van de Water
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    multi_stage_sourcemap: {
      default_options: {
        filesFrom: 'test/fixtures/A/default_options.js.map',
        options: {
        },
        files: [{
          expand: true,
          cwd: 'test/fixtures/B/',
          src: ['default_options.js.map'],
          dest: 'tmp'
        }]
      },
      custom_options: {
        filesFrom: 'test/fixtures/A/A_custom_options.js.map',
        options: {
          mapping: function(pathMapFrom, pathMapTo) {

            function getFileName(path) {
              return path.split("/").pop();
            }

            if(getFileName(pathMapFrom).split('_')[1] === getFileName(pathMapTo).split('_')[1]) {
              return true;
            } else {
              return false;
            }

          }
        },
        files: [{
          expand: true,
          cwd: 'test/fixtures/B/',
          src: ['B_custom_options.js.map'],
          dest: 'tmp'
        }]
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'multi_stage_sourcemap', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
