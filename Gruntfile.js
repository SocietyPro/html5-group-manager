module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
        options:{
          targetDir: 'bower_components',
          layout: 'byComponent',
          copy: false,
          cleanTargetDir: true,
          verbose: true,
          //cleanBowerDir: true,
        }
      },
    },
    clean: ["node_modules", 
            "test", 
            ".git",
            ".gitignore", 
            "package.json", 
            "bower.json",
           ],
    gta: {
      add_target: {
        command: 'submodule update --init',
        options: {
            stdout: true
        }
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-git-them-all');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['bower:install', 'gta', 'clean']);

};