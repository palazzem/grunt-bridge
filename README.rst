============
Grunt bridge
============

.. image:: https://travis-ci.org/palazzem/grunt-bridge.svg?branch=master
   :alt: Build status
   :target: https://travis-ci.org/palazzem/grunt-bridge

.. image:: https://coveralls.io/repos/palazzem/grunt-bridge/badge.png?branch=master
   :alt: Coverage status
   :target: https://coveralls.io/r/palazzem/grunt-bridge?branch=master

Convert all your js/css references from any views to valid backend framework static urls. Just choose your substitution
pattern.

NPM requirements:

* grunt >= 0.4.5
* `xpath`_
* `xmldom`_

.. _xpath: https://github.com/goto100/xpath
.. _xmldom: https://github.com/jindw/xmldom

Use case
--------

This grunt task is really helpful if you need to compile a valid HTML page from your frontend app so it can be used
in your backend project as a base template. A valid example is a `Django`_ app without a ``base.html`` template.
Change your Django setting ``TEMPLATE_DIRS`` to extend search path to your grunt-bridge destination dir.
In this way you'll achieve a ``base.html`` template in common between your frontend and backend app.

.. _Django: https://www.djangoproject.com/

Getting started
---------------

If you haven't used `grunt`_ before, be sure to check out the `Getting Started`_ guide, as it explains how to create a
`gruntfile`_ as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with
this command:

.. code-block:: bash

    $ npm install grunt-bridge --save-dev

.. _grunt: http://gruntjs.com/
.. _Getting Started: http://gruntjs.com/getting-started
.. _gruntfile: http://gruntjs.com/getting-started

Available task
--------------

This plugin exports ``bridge`` task and you can use it in your gruntfile. However remember that this replace
all your static (JS and CSS) with your chosen pattern so it's really useful if launched as last (or almost last) task
as follows:

.. code-block:: javascript

    grunt.registerTask('build', [
        'clean:dist',
        'bowerInstall',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin',
        'bridge:dist'     // Here I am!
    ]);

Settings
--------

Add to your ``grunt.initConfig()`` this configuration:

.. code-block:: javascript

    // ...

    bridge: {
        dev: {
            dest: '.tmp/templates/base.html'
        },
        dist: {
            dest: 'dist/templates/base.html'
        }
    },

    // ...

Use in a watcher
----------------

Prepare your watcher to launch ``bridge`` on every page changes:

.. code-block:: javascript

    watch: {
        // ...

        bridge: {
            files: ['<%= yeoman.app %>/*.html'],
            tasks: ['bridge:dev']
        },

        // ...
    },

Options
-------

html
~~~~

type: ``string``

default: ``app/base.html``

Base file to replace with chosen pattern.

pattern
~~~~~~~

type: ``string``

default: ``{% static "{path}" %}``

Replace all static with this pattern. Remember to use ``{path}`` otherwise you'll lose statics relative paths.

dest
~~~~

type: ``string``

default: ``.tmp/base.html``

Destination directory.

Changelog
---------

0.1.1
~~~~~

* Set a base HTML as a source and replace all css/js urls with a chosen pattern
* DJango static template tag is the default pattern
* Replacement skips CDN urls

License
-------

FreeBSD (see ``LICENSE.rst`` file)
