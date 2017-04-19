module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ["_build/", ".tmp"]
            }
        },
        copy: {
            bower: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: 'jquery.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: 'jquery.min.js.map',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css/',
                        src: 'bootstrap.min.css',
                        dest: 'src/public/css/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/css/',
                        src: 'font-awesome.min.css',
                        dest: 'src/public/css/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: ['fonts/**'],
                        dest: 'src/public'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: ['fonts/**'],
                        dest: 'src/public/css'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular/',
                        src: 'angular.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular/',
                        src: 'angular.min.js.map',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-route/',
                        src: 'angular-route.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-route/',
                        src: 'angular-route.min.js.map',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-resource/',
                        src: 'angular-resource.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-resource/',
                        src: 'angular-resource.min.js.map',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-animate/',
                        src: 'angular-animate.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-animate/',
                        src: 'angular-animate.min.js.map',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-bootstrap/',
                        src: 'ui-bootstrap-tpls.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/js/',
                        src: 'bootstrap.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-loading-bar/build/',
                        src: 'loading-bar.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-loading-bar/build/',
                        src: 'loading-bar.min.css',
                        dest: 'src/public/css/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-confirm-modal/',
                        src: 'angular-confirm.min.js',
                        dest: 'src/public/js/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/AngularJS-Toaster/',
                        src: 'toaster.min.css',
                        dest: 'src/public/css/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/AngularJS-Toaster/',
                        src: 'toaster.min.js',
                        dest: 'src/public/js/vendor'
                    }
	    	    ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/public',
                        src: 'index.html',
                        dest: '_build/public/'
                    },
                    {
                        expand: true,
                        cwd: 'src/public/',
                        src: ['img/**'],
                        dest: '_build/public/'
                    },
                    {
                        expand: true,
                        cwd: 'src/public/css/',
                        src: ['fonts/**'],
                        dest: '_build/public/'
                    },
                    {
                        expand: true,
                        cwd: 'src/public/',
                        src: ['fonts/**'],
                        dest: '_build/public/'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['api/**'],
                        dest: '_build/'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['config/**'],
                        dest: '_build/'
                    },
                    {
                        expand: true,
                        src: ['server.js'],
                        dest: '_build/'
                    },
                    {
                        expand: true,
                        src: ['package.json'],
                        dest: '_build/'
                    }
	    	    ]
            }
        },
        filerev: {
            dist: {
                src: ['_build/public/**/*.js', '_build/public/**/*.css']
            }
        },
        useminPrepare: {
            html: 'src/public/index.html',
            options: {
                dest: '_build/public/'
            }
        },
        usemin: {
            html: '_build/public/index.html',
            css: ['_build/public/css/*.css'],
            options: {
                assetsDirs: ['_build/public/']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/public/js',
                    src: ['**/*.js'],
                    dest: '_build/public/js'
                }]
            }
        },
        htmlmin: {
            multiple: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                        expand: true,
                        src: 'public/app/views/**/*.html',
                        cwd: 'src/',
                        dest: '_build/'
                    },
                    {
                        expand: true,
                        src: '_build/public/*.html',
                        cwd: '.'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('bower', ['copy:bower']);
    grunt.registerTask('build', ['clean:build', 'copy:build', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'filerev', 'usemin', 'htmlmin']);
};
