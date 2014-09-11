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
    clean:[ "node_modules", 
            "test", 
            ".git",
            ".gitignore", 
            "package.json", 
            "bower.json",
            // Remove all material-icons except these exceptions:
            "material-icons",
            "!material-icons/icons/system_icons/navigation/res/1x_web/ic_menu_wht_48dp.png",
            "!material-icons/icons/system_icons/action/res/1x_web/ic_view_stream_wht_48dp.png",
            "!material-icons/icons/system_icons/action/res/1x_web/ic_view_quilt_wht_48dp.png",
            "!material-icons/icons/system_icons/social/res/1x_web/ic_group_18dp.png",
            "!material-icons/icons/system_icons/action/res/1x_web/ic_drawer_wht_18dp.png",
            "!material-icons/icons/system_icons/social/res/2x_web/ic_group_48dp.png",
            "!material-icons/icons/system_icons/social/res/2x_web/ic_person_48dp.png",
            "!material-icons/icons/system_icons/navigation/res/1x_web/ic_arrow_forward_24dp.png",
            "!material-icons/icons/system_icons/navigation/res/1x_web/ic_arrow_back_24dp.png",
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