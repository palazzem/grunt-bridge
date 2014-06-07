'use strict';

var grunt = require('grunt');
var requireHelper = require('../lib/helpers');

var bridgeReplacement = requireHelper('lib/replace');

exports.bridge = {
  css: function(test) {
    test.expect(1);

    var options = {
      html: 'test/fixtures/css.html',
      pattern: '{% static \'{path}\' %}',
      dest: 'tmp/css.html'
    };

    var actual = bridgeReplacement(grunt.file.read('test/fixtures/css.html'), options);
    var expected = grunt.file.read('test/expected/css.html');
    test.equal(actual, expected, 'should change a link to a valid static link');

    test.done();
  },
  cssCdn: function(test) {
    test.expect(1);

    var options = {
      html: 'test/fixtures/cssCdn.html',
      pattern: '{% static \'{path}\' %}',
      dest: 'tmp/cssCdn.html'
    };

    var actual = bridgeReplacement(grunt.file.read('test/fixtures/cssCdn.html'), options);
    var expected = grunt.file.read('test/expected/cssCdn.html');
    test.equal(actual, expected, 'should change only local links but not CDNs');

    test.done();
  },
  script: function(test) {
    test.expect(1);

    var options = {
      html: 'test/fixtures/script.html',
      pattern: '{% static \'{path}\' %}',
      dest: 'tmp/script.html'
    };

    var actual = bridgeReplacement(grunt.file.read('test/fixtures/script.html'), options);
    var expected = grunt.file.read('test/expected/script.html');
    test.equal(actual, expected, 'should change only local scripts but not CDNs');

    test.done();
  },
  differentPattern: function(test) {
    test.expect(1);

    var options = {
      html: 'test/fixtures/pattern.html',
      pattern: '{{# url \'{path}\' }}',
      dest: 'tmp/pattern.html'
    };

    var actual = bridgeReplacement(grunt.file.read('test/fixtures/pattern.html'), options);
    var expected = grunt.file.read('test/expected/pattern.html');
    test.equal(actual, expected, 'should use a different pattern');

    test.done();
  }
};
