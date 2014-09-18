var Cambrian = Cambrian || {};
var japi;
if(Cambrian.JAPI !== undefined && !Cambrian.isMockCambrian){
  console.log('Instantiating japi');
  japi = Cambrian.JAPI();
} else {
  // use mocks
  console.log('Instantiating mock japi');
  japi = Cambrian.mockJAPI();
}

//appModule = angular.module("app", ['eee-c.angularBindPolymer'])

var GROUP_TYPES = ['corporation', 'broadcast', 'open'];

appModule = angular.module("app", ['ngMaterial'])
.factory("menu", ['$rootScope', function ($rootScope) {
  var self;
  var groups = ['myGroups', 'myPeerLists'];

  return self = {
    groups: groups,

    selectGroup: function(group) {
      self.currentGroup = group;
      $rootScope.listContains = group;
    },
    isGroupSelected: function (group) {
      return self.currentGroup === group;
    }
  };

}])
.controller("appCtrl", function ($scope, $materialSidenav, $materialDialog, menu, $rootScope, $element) {
  
  $scope.menu = menu;
  $scope.menu.selectGroup(menu.groups[0]);

  $scope.myPeers = japi.me.peers;
  $scope.myGroups = japi.me.groups;
  $scope.myPeerLists = japi.me.peerLists;
  $scope.groupTypes = GROUP_TYPES;
  $scope.newGroupType = $scope.groupTypes[0];
  /*
  $scope.isEditing = false;
  $scope.tempGroup = {
    name: "",
    type: "",
    description: "",
  }
  */

  for (var i=0; i < $scope.myGroups.length; i++) {
    $scope.myGroups[i].isActive = false;
  };

  /*
  for (var i=0; i < $scope.myPeerLists.length; i++) {
    $scope.myGroups.isActive[i] = false;
  };
  */

  $scope.openEditorPhase1 = function(){
    $scope.isEditingPhase1 = true;
    $scope.isEditingPhase2 = false;
    //var nTypes = GROUP_TYPES.length;
    //angular.element('#quickAddBox select').attr('size', Math.min(nTypes, 10));
  };

  $scope.openEditorPhase2 = function(){
    $scope.isEditingPhase1 = false;
    $scope.isEditingPhase2 = true;
    $scope.newGroup()
  };

  $scope.stopEditing = function(){
    //angular.element('#quickAddBox select').attr('size', 1);
    $scope.isEditingPhase1 = false;
    $scope.isEditingPhase2 = false;

  }

  $scope.toggleMenu = function () {
    $materialSidenav('left').toggle();
  };

  $scope.listView = "quilt";

  $scope.streamView = function () {
    $scope.listView = "stream";
  };

  $scope.quiltView = function () {
    $scope.listView = "quilt";
  };

  $scope.overflowToggle = function (group) {
    group.overflow = !group.overflow;
  };

  // We will now invoke newGroup between isEditingPhase1 and isEditingPhase2
  $scope.newGroup = function () {
    //var groupToAdd = { name: $scope.newGroupTitle, groupType: $scope.newGroupType, members: []};
    var groupToAdd = japi.groups.build($scope.newGroupType);
    groupToAdd.name = $scope.newGroupTitle;
    //groupToAdd.type = $scope.newGroupType;
    //groupToAdd.members = [];
    $scope.myGroups.push(groupToAdd);
    $scope.newGroupTitle = "";
    $scope.quickAddForm.$setPristine();
    // We'll craft a dummy event from the quick add box so the dialog animates nicely
    var qab = angular.element('#quickAddBox');
    var x = qab.offset().left;
    var y = qab.offset().top;
    /*
    qab.click(function(){
      $scope.dialog(e, groupToAdd);
    });
    qab.click();
    */


    console.log(qab);
    //var e = new Event('click');
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent(
      'click',
      false, false, window,       // canBubble, cancelable, view
      0, 300, 300, 300, 300,      // detail, screenX, screenY, clientX, clientY
      false, false, false, false, // ctrlKey, altKey, shiftKey, metaKey
      0, null                     // button(LMB), relatedTarget
    )
    console.log(e);
    qab.click(function(e){
      console.log(e)
    });

    //qab.dispatchEvent()
    $scope.dialog(e, groupToAdd);
  };

  $scope.duplicateGroup = function (group) {
    //var buildGroup = angular.copy(group);
    var buildGroup = japi.groups.build(group);
    console.log(buildGroup);
    buildGroup.name = buildGroup.name + " (Duplicate)";
    buildGroup.overflow = false;
    $scope.myGroups.push(buildGroup);
    group.overflow = false;
  };

  $scope.deleteGroup = function (group) {
    var confirmed = confirm('Are you sure you want to permanently remove the group:\n'+(group.name || ""));
    if(!confirmed){ return }
    var index = $scope.myGroups.indexOf(group);

    if (index > -1) {
      $scope.myGroups.splice(index, 1);  
    }
    group.overflow = false;
    group.destroy();
  };

  $scope.dialog = function (e, group) {
    $materialDialog({
      templateUrl: 'partials/editGroupCard.tmpl.html',
      targetEvent: e,
      hasBackdrop: false,
      //clickOutsideToClose: false, // we have to do something custom
      //escapeToClose: false,
      controller: ['$scope', '$hideDialog', function ($scope, $hideDialog) {
        $scope.group = group;
        $scope.japi = japi;
        $scope.newGroupType = group.type;
        console.log('Setting dialog $scope.newGroupType to ',group.type)
        $scope.groupTypes = GROUP_TYPES;
        $scope.newGroupTitle = group.name;

        // Focus the group name when the dialog opens:
        // ACTUALLY. the material-dialog script focuses the close button.
        // Ugly hack:
        window.setTimeout(function(){
          angular.element('material-dialog #groupName').focus();
        }, 200);

        // Filter to display only nonMembers:
        $scope.nonMembers = function(peer){
          for(var i=0; i<$scope.group.members.length; i++){
            if(angular.equals($scope.group.members[i], peer)){ // Peer was found
              return false; // this member should be hidden
            }
          }
          return true; // this nonmember should be shown
        };
        $scope.close = function () {
          $hideDialog();
          $scope.stopEditing();
        };

        $scope.save = function (group) {
          group.save()
          $hideDialog();
          $scope.stopEditing();
        };
        /* No good, this is not in scope...
        $scope.$on("$destroy", function(){
          $scope.stopEditing();
        });
        */
      }]
    });
  };

});

window.setInterval(function(){
  console.log(document.activeElement);
}, 5000);