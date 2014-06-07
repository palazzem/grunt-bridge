/*
 * grunt-bridge
 * https://github.com/palazzem/grunt-bridge
 *
 * Copyright (c) 2014 Emanuele Palazzetti
 * Licensed under the BSD license.
 */

module.exports = function (path) {
  return require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../') + path);
};
