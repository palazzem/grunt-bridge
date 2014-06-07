/*
 * grunt-bridge
 * https://github.com/palazzem/grunt-bridge
 *
 * Copyright (c) 2014 Emanuele Palazzetti
 * Licensed under the BSD license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'lib/*.js',
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
    bridge: {
      css: {
        options: {
          html: 'test/fixtures/css.html',
          dest: 'tmp/css.html'
        }
      },
      cssCdn: {
        options: {
          html: 'test/fixtures/cssCdn.html',
          dest: 'tmp/cssCdn.html'
        }
      },
      script: {
        options: {
          html: 'test/fixtures/script.html',
          dest: 'tmp/script.html'
        }
      },
      differentPattern: {
        options: {
          html: 'test/fixtures/pattern.html',
          pattern: '{{# url \'{path}\' }}',
          dest: 'tmp/pattern.html'
        }
      }
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

  // Test task
  grunt.registerTask('test', ['clean', 'bridge', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
