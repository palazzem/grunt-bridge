'use strict';

var grunt = require('grunt');

exports.djangoStatic = {
  setUp: function(done) {
    done();
  },
  css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/css.html');
    var expected = grunt.file.read('test/expected/css.html');
    test.equal(actual, expected, 'should change a link to a valid static link');

    test.done();
  },
  cssCdn: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/cssCdn.html');
    var expected = grunt.file.read('test/expected/cssCdn.html');
    test.equal(actual, expected, 'should change only local links but not CDNs');

    test.done();
  },
  script: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/script.html');
    var expected = grunt.file.read('test/expected/script.html');
    test.equal(actual, expected, 'should change only local scripts but not CDNs');

    test.done();
  },
  differentPattern: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/pattern.html');
    var expected = grunt.file.read('test/expected/pattern.html');
    test.equal(actual, expected, 'should use a different pattern');

    test.done();
  }
};
