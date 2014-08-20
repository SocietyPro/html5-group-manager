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

appModule = angular.module("app", [])
.controller("appCtrl", function ($scope) {
  $scope.tempScopeName = "Just a test";
  $scope.tempScope = {name: "Just a test"};
  $scope.myPeers = japi.me.peers;
  $scope.myGroups = japi.me.groups;
});
