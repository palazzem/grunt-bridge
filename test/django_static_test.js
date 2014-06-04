'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

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
  }
};
