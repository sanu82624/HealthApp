/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
	express: {
            all: {
                options: {
                    bases: ['H:\\X1\\HealthApp\\www'],
                    port: 8080,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },

        watch: {
            all: {
                    files: '**/*.html',
                    options: {
                        livereload: true
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });
    
    grunt.registerTask('serve', [
    'express',
    'open',
    'watch'
    ]);
};
