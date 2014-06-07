/*
 * grunt-bridge
 * https://github.com/palazzem/grunt-bridge
 *
 * Copyright (c) 2014 Emanuele Palazzetti
 * Licensed under the BSD license.
 */

'use strict';

module.exports = function (grunt) {
  var bridgeReplacement = require('../lib/replace');

  grunt.registerMultiTask('bridge', 'Convert all your js/css references to valid backend framework static urls', function () {
    // Collect files and options
    var options = this.options({
      html: 'app/base.html',
      pattern: '{% static \'{path}\' %}',
      dest: '.tmp/base.html'
    });

    // Load base file of your framework
    var baseHtml = grunt.file.read(options.html);

    // Generate new html
    var newHtml = bridgeReplacement(baseHtml, options, grunt.log.write);

    // Write base html to a new file according to destination
    grunt.file.write(options.dest, newHtml);
  });
};
