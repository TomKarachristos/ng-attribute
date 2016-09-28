var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.isWorking = true;
});

app.directive('ngAttrs', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attr ) {

      scope.$watch( attr['ngAttrs'] , function (newAttrs,oldValue) {
        addAttributes(getAttributes(newAttrs));
      }, true);

      function getAttributes(newAttrs) {
        var attrsToAdd = {};

        if (angular.isObject(newAttrs)) {
          angular.forEach(newAttrs, function(attrValue, attrName) {
            if (typeof attrValue === "boolean") {
              var fullAttribute = attrName.split('=');
              if (attrValue) {
                attrsToAdd[fullAttribute[0]] = fullAttribute[1];
              }
            }
          });
        } else {
        	console.warn("no object in ng-attrs");
        }

        return attrsToAdd;
      }

      function addAttributes(attrsToAdd) {
        angular.forEach(attrsToAdd, function(attrValue, attrName) {
          element.attr(attrName, attrValue);
        });

      }

    }
  }
});


