//

var app = angular.module('jsApp', ['ngRoute', 'ngTouch', "mobile-angular-ui"]).config(function ($routeProvider) {

    $routeProvider.when('/', {templateUrl: '/public/home.html', reloadOnSearch: false});
    $routeProvider.when('/route1', {templateUrl: '/public/toggle.html', reloadOnSearch: false});
    $routeProvider.when('/route2', {templateUrl: '/public/tabs.html', reloadOnSearch: false});
    $routeProvider.when('/drag', {templateUrl: '/public/drag.html', reloadOnSearch: false});
    $routeProvider.when('/carousel', {templateUrl: '/public/carousel.html', reloadOnSearch: false});
  });

app.directive('dragToDismiss', function ($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function (elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function (scope, elem, attrs) {
        var dismiss = false;

        $drag.bind(elem, {
          constraint: {
            minX: 0,
            minY: 0,
            maxY: 0
          },
          move: function (c) {
            if (c.left >= c.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function () {
            elem.removeClass('dismiss');
          },
          end: function (c, undo, reset) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function () {
                scope.$apply(function () {
                  dismissFn(scope);
                });
              }, 400);
            } else {
              reset();
            }
          }
        });
      };
    }
  };
});

app.directive('carouselItem', function ($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function (scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function () {
        var res = 0;
        if (id == carousel.activeItem) {
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function () {
        return carousel.activeItem;
      }, function (n, o) {
        elem[0].style['z-index'] = zIndex();
      });

      $drag.bind(elem, {
        constraint: { minY: 0, maxY: 0 },
        adaptTransform: function (t, dx, dy, x, y, x0, y0) {
          var maxAngle = 15;
          var velocity = 0.02;
          var r = t.getRotation();
          var newRot = r + Math.round(dx * velocity);
          newRot = Math.min(newRot, maxAngle);
          newRot = Math.max(newRot, -maxAngle);
          t.rotate(-r);
          t.rotate(newRot);
        },
        move: function (c) {
          if (c.left >= c.width / 4 || c.left <= -(c.width / 4)) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function () {
          elem.removeClass('dismiss');
        },
        end: function (c, undo, reset) {
          elem.removeClass('dismiss');
          if (c.left >= c.width / 4) {
            scope.$apply(function () {
              carousel.next();
            });
          } else if (c.left <= -(c.width / 4)) {
            scope.$apply(function () {
              carousel.next();
            });
          }
          reset();
        }
      });
    }
  };
});

app.directive('carousel', function () {
  return {
    restrict: 'C',
    scope: {},
    controller: function ($scope) {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function () {
        var newId = this.itemCount++;
        this.activeItem = this.itemCount == 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function () {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem == this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function () {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function ($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function (scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function () {
        var res = 0;
        if (id == carousel.activeItem) {
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function () {
        return carousel.activeItem;
      }, function (n, o) {
        elem[0].style['z-index'] = zIndex();
      });

      $drag.bind(elem, {
        constraint: { minY: 0, maxY: 0 },
        adaptTransform: function (t, dx, dy, x, y, x0, y0) {
          var maxAngle = 15;
          var velocity = 0.02;
          var r = t.getRotation();
          var newRot = r + Math.round(dx * velocity);
          newRot = Math.min(newRot, maxAngle);
          newRot = Math.max(newRot, -maxAngle);
          t.rotate(-r);
          t.rotate(newRot);
        },
        move: function (c) {
          if (c.left >= c.width / 4 || c.left <= -(c.width / 4)) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function () {
          elem.removeClass('dismiss');
        },
        end: function (c, undo, reset) {
          elem.removeClass('dismiss');
          if (c.left >= c.width / 4) {
            scope.$apply(function () {
              carousel.next();
            });
          } else if (c.left <= -(c.width / 4)) {
            scope.$apply(function () {
              carousel.next();
            });
          }
          reset();
        }
      });
    }
  };
});

app.controller('MainController', function ($rootScope, $scope) {

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.loading = false;
  });

});

