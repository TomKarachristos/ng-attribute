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
    priority: 1000,
    terminal: true,
    link: function (scope, element, attr ) {

      scope.$watch( attr.ngAttrs , function (new_attrs) {
        if (angular.isObject(new_attrs)) {
          angular.forEach(new_attrs, set_attributes );
          // TODO check if need before do compile
          compileElement();
        } else {
          console.warn("no object in ng-attrs");
        }
      }, true);

      set_attributes = function(attr_value, attr_name) {
        if (typeof attr_value === "boolean") {
          name = attr_name.split('=');
          var value = name[1] || '';
          var name = name[0];
          if (attr_value) {
            attr.$set(name, value);
          } else{
            element.removeAttr(name);
          }
        }
      };

      compileElement = function(){
        if(attr.ngModel){
          $compile(element)(scope.$new());
        }else{
          $compile(element)(scope);
        }
      };

      element.removeAttr('ng-attrs');
    }
  };
});

