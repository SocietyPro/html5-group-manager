var path = require('path');

// Because we are deleting the whole material-icons folder, 
// the normal file matcher can't exclude these by !exclusion
// We will compare every file and folder scheduled for cleaning against this list:
var EXCLUDED_ICONS = [
  "material-icons/icons/system_icons/navigation/res/1x_web/ic_menu_wht_48dp.png",
  "material-icons/icons/system_icons/action/res/1x_web/ic_view_stream_wht_48dp.png",
  "material-icons/icons/system_icons/action/res/1x_web/ic_view_quilt_wht_48dp.png",
  "material-icons/icons/system_icons/social/res/1x_web/ic_group_18dp.png",
  "material-icons/icons/system_icons/action/res/1x_web/ic_drawer_wht_18dp.png",
  "material-icons/icons/system_icons/social/res/2x_web/ic_group_48dp.png",
  "material-icons/icons/system_icons/social/res/2x_web/ic_person_48dp.png",
  "material-icons/icons/system_icons/navigation/res/1x_web/ic_arrow_forward_24dp.png",
  "material-icons/icons/system_icons/navigation/res/1x_web/ic_arrow_back_24dp.png",
];

function deletePathOK(p){
  p = norm(p);
  if(pathIsParent(p) || pathIsExact(p)){ // parent of an exclusion, or is an exclusion
    return false;
  } else {
    return true;
  }
};

function pathIsParent(p){
  var isParent = false;
  // See if any of the exclude paths are children of this path
  each(function(x){
    var rel1 = relPath(p, x); 
    // result could be: 'aa/bb' (grand)parent, '' same path, '../aa/bb/' non-parent
    isParent = 
      rel1.match(/^\.\./) 
      ? isParent : true;
  });
  return isParent;
}

function pathIsExact(p){ // cleaning path
  var exact = false;
  each(function(x){  // exclusion path
    exact = 
      relPath(p,x) === '' 
      ? true : exact;
  })
  return(exact);
}

function each(fn){
  EXCLUDED_ICONS.forEach(function(x){
    x = norm(x);
    fn(x);
  });
}
function norm(p){
  return path.normalize(p);
};
function relPath(from,to){
  from = norm(from);
  to = norm(to);
  return path.relative(from,to);
};


module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options:{
          targetDir: 'bower_components',
          layout: 'byComponent',
          copy: false,
          cleanTargetDir: true,
          verbose: true,
        }
      },
    },
    clean:{
      icons: { // Clean task 1
        src: ["material-icons/**/*"],
        filter: deletePathOK,  // see top - this skips folders with child files to exclude from deletion
      },
      others: { // Clean task 2. Nothing special here.
        src: [
          "node_modules", 
          "test", 
          ".git",
          ".gitignore",
          ".gitmodules",
          "Gruntfile.js",
          "package.json", 
          "bower.json",
        ],
      },
    },
    gta: {
      add_target: {
        command: 'submodule update --init',
        options: {
            stdout: true
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-git-them-all');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', [
   'bower:install',
   'gta', 
   'clean:icons',
   'clean:others',
  ]);

};