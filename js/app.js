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
.controller("appCtrl", function ($scope, $materialSidenav, menu, $rootScope) {
  
  $scope.menu = menu;
  $scope.menu.selectGroup(menu.groups[0]);

  $scope.myPeers = japi.me.peers;
  $scope.myGroups = japi.me.groups;
  $scope.myPeerLists = japi.me.peerLists;

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

  $scope.listView = "stream";

  $scope.streamView = function () {
    $scope.listView = "stream";
  };

  $scope.quiltView = function () {
    $scope.listView = "quilt";
  };

  $scope.toggleEntry = function (entry) {
    entry.isActive = !entry.isActive;
  };
})
.directive('ig', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      fid: '@'
    },
    template: 
      '<material-input-group>' +
        '<label for="{{fid}}">Add a group...</label>' +
        '<material-input id="{{fid}}" type="text" size="50" ng-model="data.description">' +
      '</material-input-group>'
  };
});
