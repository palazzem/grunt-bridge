/*
 * grunt-django-static
 * https://github.com/palazzem/grunt-django-static
 *
 * Copyright (c) 2014 Emanuele Palazzetti
 * Licensed under the BSD license.
 */

'use strict';

module.exports.format = function(string, object) {
    var matchCallback = function(match, key) {
        return object[key];
    };

    return string.replace(/\{(\w*)\}/g, matchCallback);
};
