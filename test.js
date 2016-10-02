var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.isCorporate = true;

    $scope.changeState = function(){
      $scope.isCorporate = !$scope.isCorporate ;
    };
});

app.directive('ngAttrs', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attr ) {

      scope.$watch( attr.ngAttrs , function (newAttrs,oldvalue) {
        if (angular.isObject(newAttrs)) {
          angular.forEach(newAttrs, function(attrValue, attrName) {
            if (typeof attrValue === "boolean") {
              var fullAttribute = attrName.split('=');
              var name = fullAttribute[0];
              var value = fullAttribute[1];
              if (attrValue) {
                attr.$set(name, value);
              } else{
                element.removeAttr(fullAttribute[0]);
              }
            }
          });
          $compile(element)(scope);
        } else {
          console.warn("no object in ng-attrs");
        }
      }, true);

      element.removeAttr('ng-attrs');

    }
  };
});

