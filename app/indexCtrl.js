'use strict';

app.controller('indexCtrl',
function ($scope
        , storage
        , tabModel
        ) {

  $scope.url = null;
  
  $scope.storage = storage;
  $scope.tabModel = tabModel;

  $scope.add = function() {
      storage.add($scope.newContent);
      $scope.newContent = '';
  }

  $scope.remove = function(item) {
      storage.remove(item);
  }

  $scope.removeAll = function() {
      storage.removeAll();
  }

  $scope.toggleCompleted = function() {
      storage.sync();
  }

  this.init = function() {
    console.log('init indexCtrl');
    $scope.tabModel.getUrl(function(tabs) {
      $scope.url = tabs[0].url;
    });

    $scope.$watch('storage.data', function() {
        $scope.todoList = $scope.storage.data;
    });

    $scope.storage.findAll(function(data){
        $scope.todoList = data;
        $scope.$apply();
    });
    
  }

  this.init();

});