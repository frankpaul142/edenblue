angular.module('myApp.directives', [])
    .directive('pwCheck', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function() {
                    scope.$apply(function() {
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                    });
                });
            }
        }
    }).directive('compile', function($compile, $location, $anchorScroll) {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(
                    function(scope) {
                        return scope.$eval(attrs.compile);
                    },
                    function(value) {
                        var content = $compile(value)(scope);
                        element.html(content);
                        scope.goTo = function(id) {
                            $location.hash(id);
                            $anchorScroll();
                        }
                    }
                );
            }
        }
    }).directive('compileroom', function($compile) {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(
                    function(scope) {
                        return scope.$eval(attrs.compileroom);
                    },
                    function(value) {
                        var content = $compile(value)(scope);
                        element.html(content);
                        scope.calcular();
                    }
                );
            }
        }
    });
