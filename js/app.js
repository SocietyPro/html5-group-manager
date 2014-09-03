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
  $scope.groupTypes = ['Broadcast List'];
  $scope.newGroupType = $scope.groupTypes[0];

  for (var i=0; i < $scope.myGroups.length; i++) {
    $scope.myGroups[i].isActive = false;
  };

  /*
  for (var i=0; i < $scope.myPeerLists.length; i++) {
    $scope.myGroups.isActive[i] = false;
  };
  */

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

  $scope.newGroup = function () {
    var groupToAdd = { name: $scope.newGroupTitle, groupType: $scope.newGroupType, members: []};
    $scope.myGroups.push(groupToAdd);
    $scope.newGroupTitle = "";
    $scope.quickAddForm.$setPristine();
  };

  $scope.duplicateGroup = function (group) {
    var buildGroup = angular.copy(group);
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
  };

  $scope.dialog = function (e, group) {
    $materialDialog({
      templateUrl: 'partials/editGroupCard.tmpl.html',
      targetEvent: e,
      controller: ['$scope', '$hideDialog', function ($scope, $hideDialog) {
        $scope.group = group;
        $scope.japi = japi;
        $scope.nonMembers = function(item){
          var i = $scope.group.members.indexOf(item);
          if(i === -1){
            return true; // this nonmember should be shown
          } else {
            return false; // this member should be hidden
          }
        };
        $scope.close = function () {
          $hideDialog();
        };

        $scope.save = function (group) {
          $scope.group.save;
          $hideDialog();
        };

      }]
    });
  };

});
