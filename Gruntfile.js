(function() {
  'use strict';

  module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({

      jshint: {
        all: ['Gruntfile.js', 'static/app/js/**/*.js']
      },

    });

    grunt.registerTask('default', ['jshint']);
  };
})();