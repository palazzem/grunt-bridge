/*
 * grunt-bridge
 * https://github.com/palazzem/grunt-bridge
 *
 * Copyright (c) 2014 Emanuele Palazzetti
 * Licensed under the BSD license.
 */

'use strict';
var requireHelper = require('./helpers');

module.exports = function (htmlToReplace, options, logger) {
  var xpath = require('xpath'),
    DOMParser = require('xmldom').DOMParser,
    defaultMime = 'text/html',
    format = requireHelper('lib/formatter').format;

  // In this way the logger could be disabled during unittest
  logger = logger || function() { return { ok: function() {} }; };

  // Parse HTML
  var dom = new DOMParser().parseFromString(htmlToReplace, defaultMime);

  // Find <link> and <scripts>
  var nodes = [];
  nodes = nodes.concat(xpath.select("//link[not(contains(@href, '//'))]", dom));
  nodes = nodes.concat(xpath.select("//script[@src and not(contains(@src, '//'))]", dom));
  logger('Statics found: ' + nodes.length + '\n');

  nodes.forEach(function (value) {
    // Grab correct selector
    var originNode = xpath.select1('@href', value) || xpath.select1('@src', value);

    // Change origin node with a new static url
    var newPattern = format(options.pattern, {path: originNode.value});
    var staticLink = originNode.toString().replace(originNode.value, newPattern);

    htmlToReplace = htmlToReplace.replace(originNode, staticLink);
    logger(originNode.value + '....').ok();
  });

  return htmlToReplace;
};
