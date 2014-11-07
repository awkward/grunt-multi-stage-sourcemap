/*
 * grunt-multi-stage-sourcemap
 * https://github.com/jchn/grunt-multi-stage-sourcemap
 *
 * Copyright (c) 2014 John van de Water
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var transfer = require('multi-stage-sourcemap').transfer;

  function transferMaps(files) {
    // Transfer and write all the things!
    files.forEach(function(file) {

      var cToAMap = transfer({fromSourceMap: file.fromContents, toSourceMap: file.contents});

      grunt.file.write(file.dest, cToAMap);
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  }

  // The default, naive mapping function which just checks matching filenames
  function naiveMapping(pathMapFrom, pathMapTo) {

    function getFilename(path) {
      return path.split("/").pop();
    }

    if (getFilename(pathMapFrom) === getFilename(pathMapTo)) {
      return true;
    }
  }

  grunt.registerMultiTask('multi_stage_sourcemap', 'Remap multi-level sourcemaps', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mapping: naiveMapping
    });

    var filesFrom = this.data.filesFrom;

    filesFrom = grunt.file.expand(filesFrom);

    // Handle filesFrom
    filesFrom.filter(function(filepath) {
      // Warn on and remove invalid source files (if nonull was set).
      if(!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    });

    var filesTo = [];
    this.files.forEach(function(file) {

      file.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(path) {
        filesTo.push({src:path, dest:file.dest, orig:file.orig, contents: grunt.file.read(path)});
      });
    });

      // Map fileFrom to fileTo
      filesTo.map(function(fileTo) {
        filesFrom.forEach(function(fileFrom) {
          if (options.mapping(fileFrom, fileTo.src)) {
            fileTo.from = fileFrom;
            fileTo.fromContents = grunt.file.read(fileFrom);
            return fileTo;
          }
        });
        return false;
      });

      transferMaps(filesTo);
  });

};
