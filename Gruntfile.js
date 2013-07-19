'use strict';

module.exports = function(grunt) {

  // Load all grunt-related tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    docs: 'docs',
    hbsTemplatePath: '/html/partials/templates/',
    temp: 'temp',
    test: 'test',
    vendor: 'components',
    port: 8000
  };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    yeoman: yeomanConfig,
    assemble: {
      options: {
        data: '<%= yeoman.app %>/html/data/*',
        flatten: true,
        partials: '<%= yeoman.app %>/html/partials/{,*/}*.hbs',
        environment: 'dev'
      },
      loggedout: {
        options: {
          layout: '<%= yeoman.app %>/html/layouts/default.hbs'
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/html/pages',
          src: ['*.hbs'],
          dest: '<%= yeoman.temp %>'
        }]
      }
    },
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: [yeomanConfig.dist],
      docs: [yeomanConfig.docs],
      temp: [yeomanConfig.temp],
      build: [yeomanConfig.dist, yeomanConfig.docs, yeomanConfig.temp]
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/css',
        cssDir: '<%= yeoman.temp %>/css',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptDir: '<%= yeoman.app %>/js',
        outputStyle: 'expanded',
        noLineComments: false,
        force: false
      },
      dist: {
        options: {
          noLineComments: false,
        },
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['components/requirejs/require.js', '<%= concat.dist.dest %>'],
        dest: 'dist/require.js'
      }
    },
    connect: {
      options: {
        port: yeomanConfig.port,
        hostname: 'localhost'
      },
      development: {
      },
      production: {
        options: {
          middleware: function(connect) {
            return [
              // rewrite requirejs to the compiled version
              function(req, res, next) {
                if (req.url === '/components/requirejs/require.js') {
                  req.url = '/dist/require.min.js';
                }
                next();
              },
              connect.static(yeomanConfig.dist),

            ];
          }
        }
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static(yeomanConfig.temp),
              connect.static(yeomanConfig.app),
              connect.directory(yeomanConfig.temp)
            ];
          }
        }
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.vendor %>/knockout/build/output',
            src: ['knockout-latest.*'],
            dest: '<%= yeoman.temp %>/js/lib/knockout'
          },
          {
            expand: true,
            cwd: '<%= yeoman.vendor %>/sammy/lib',
            src: ['sammy.js'],
            dest: '<%= yeoman.temp %>/js/lib/sammy'
          },
          {
            expand: true,
            cwd: '<%= yeoman.vendor %>',
            src: [
              '*/{require,modernizr,handlebars}.js',
              '*/jquery.*js'
            ],
            dest: '<%= yeoman.temp %>/js/lib'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.temp %>',
            src: ['{,*/}*'],
            dest: '<%= yeoman.dist %>'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: [
              'js/{,*/}*.js'
            ],
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },
    docker: {
      app: {
        expand: true,
        src: ['<%= yeoman.app %>/js/{,*/}*.js'],
        dest: 'docs',
        options: {
          onlyUpdated: false,
          colourScheme: 'default',
          ignoreHidden: false,
          sidebarState: true,
          exclude: false,
          lineNums: false,
          js: [],
          css: [],
          extras: []
        }
      }
    },
    handlebars: {
      partials: {
        options: {
          amd: true,
          namespace: 'tmpl',
          processName: function(filename) {
            var regex = /(app\/html\/partials\/templates\/)(.*)\.hbs/;
            return filename.replace(regex, "$2")
          }
        },
        src: ['<%= yeoman.app %><%= yeoman.hbsTemplatePath %>*.hbs'],
        dest: '<%= yeoman.temp %>/js/templates.js'
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    requirejs: {
      compile: {
        options: {
          name: 'config',
          mainConfigFile: 'app/config.js',
          out: '<%= concat.dist.dest %>',
          optimize: 'none'
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/require.min.js'
      }
    },
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/css/{,partials/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= yeoman.temp %>/{,*/}*.html',
          '<%= yeoman.temp %>/{css,js}/{,*/}*.{css,js}',
          '<%= yeoman.app %>/js/{,*/}*.js',
          '<%= yeoman.temp %>/images/{,*/}*.{png,jpg,jpeg}'
        ]
      },
      assemble: {
        files: [
          '<%= yeoman.app %>/html/**/*.{hbs,json}'
        ],
        tasks: ['assemble']
      },
      handlebars: {
        files: ['<%= yeoman.app %>/js/html/templates/*.hbs'],
        task: ['handlebars']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'qunit',
    'clean',
    'requirejs',
    'concat',
    'uglify'
  ]);
  grunt.registerTask('preview', [
    'connect:development'
  ]);
  grunt.registerTask('preview-live', [
    'default',
    'connect:production'
  ]);

  grunt.registerTask('docs', [
    'clean:docs',
    'docker'
  ]);

  grunt.registerTask('server', function (target) {
    var s = {
      dev: 'dev', cert: 'cert', prod: 'prod'
    };

    if (target === s.prod) {
      return grunt.task.run(['default']);
      // return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }
    if (target === s.cert) {
      return grunt.task.run(['preview-live']);
    }
    if (target === s.dev) {
      return grunt.task.run(['preview']);
    }

    return grunt.task.run([
      'clean:build',
      'compass',
      'assemble',
      'handlebars',
      'copy:dev',
      'connect:livereload',
      'open',
      'watch'
    ]);

  });

};
