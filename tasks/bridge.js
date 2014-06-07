/*
 * grunt-bridge
 * https://github.com/palazzem/grunt-bridge
 *
 * Copyright (c) 2014 Emanuele Palazzetti
 * Licensed under the BSD license.
 */

'use strict';

module.exports = function (grunt) {
  var xpath = require('xpath'),
    DOMParser = require('xmldom').DOMParser,
    defaultMime = 'text/html',
    format = require('../lib/formatter').format;

  grunt.registerMultiTask('bridge', 'Convert all your js/css references to valid backend framework static urls', function () {
    // Collect files and options
    var options = this.options({
      html: 'app/base.html',
      pattern: '{% static \'{path}\' %}',
      dest: '.tmp/base.html'
    });

    var nodes = [];

    // Load and parse base file of your framework
    var baseHtml = grunt.file.read(options.html);
    var dom = new DOMParser().parseFromString(baseHtml, defaultMime);

    // Find <link> and <scripts>
    nodes = nodes.concat(xpath.select("//link[not(contains(@href, '//'))]", dom));
    nodes = nodes.concat(xpath.select("//script[not(contains(@src, '//'))]", dom));
    grunt.log.writeln("Statics found: " + nodes.length);

    nodes.forEach(function (value) {
      // Grab correct selector
      var originNode = xpath.select1('@href', value) || xpath.select1('@src', value);

      // Change origin node with a new static url
      var newPattern = format(options.pattern, {path: originNode.value});
      var staticLink = originNode.toString().replace(originNode.value, newPattern);

      baseHtml = baseHtml.replace(originNode, staticLink);
      grunt.log.write(originNode.value + "...").ok();
    });

    // Write base html to a new file according to destination
    grunt.file.write(options.dest, baseHtml);
  });
};
