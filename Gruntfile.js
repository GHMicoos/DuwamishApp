var grunt = require('grunt');

// load plugins just in time to speed up grunt
require('jit-grunt')(grunt);

// report on time taken for each task
require('time-grunt')(grunt);

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'), // read and parse package.json into pkg variable

  hexo: {
    clean: {
      options: {
        root: '/',
        cliCmd: 'clean'
      }
    },
    generate: {
      options: {
        root: '/',
        cliCmd: 'generate'
      }
    },
  },

  jshint: { // runs jshint on all js files
    all: {
      src: ['Gruntfile.js','source/js/*.js'],
      options: {
        force: false
      }
    }
  },

  // clean: ['dist'], // deletes everything in this folder

  // copy: {
    // html: { // copies html into dist folder
    //   src: ['public/**/*.html'],
    //   dest: 'dist/',
    //   expand: true,
    //   flatten: true
    // },
    // photos: { // copies photos into dist/photos
    //   src: ['public/photos/**'],
    //   dest: 'dist/photos/',
    //   flatten: true,
    //   expand: true,
    //   filter: 'isFile'
    // }
  // },

  less: { // interprets less imports, compiles less > css, concats css into one big file
    all: {
      files: {
        'source/css/style.css':'source/_less/style.less'
      }
    },
    options: {
      strictImport: true,
      sourceMap: true // allows us to see the less, instead of just the css, in the browser
    }
  },

  uglify: { // combines and ugilifies (minifies) js
    all: {
      files: {
        'dist/js/app.js': ['source/js/*.js'],
        'dist/js/tas.js': ['source/js/takeAStand/*.js'],
        'dist/js/vendor.js':['source/js/vendor/*.js']
      },
    },
    options: { // switch these flags to turn on minification
      compress: false,
      mangle: false,
      beautify: true
    }
  },

  watch: { // reruns tasks when certain files change
    js: {
      files: ['source/js/**/*.js'],
      tasks: ['uglify']
    },
    css: {
      files: ['source/_less/**/*.less'],
      tasks: ['less']
    },
    grunt: {
      files: 'Gruntfile.js',
      tasks: ['default']
    },
  }

});

// runs the following tasks when you just type "grunt"
grunt.registerTask('default', ['jshint', 'build']);
// runs the following tasks when you type "grunt build", also referenced in above task
grunt.registerTask('build', ['hexo:clean', 'less', 'uglify', 'hexo:generate', 'watch']);
grunt.registerTask('build:only', ['hexo:clean', 'less', 'uglify', 'hexo:generate']);
