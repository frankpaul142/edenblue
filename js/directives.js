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
	}).directive('optionsDisabled', function($parse) {
		var disableOptions = function(scope, attr, element, data, fnDisableIfTrue) {
			// refresh the disabled options in the select element.
			$("option[value!='?']", element).each(function(i, e) {
				var locals = {};
				locals[attr] = data[i];
				$(this).attr("disabled", fnDisableIfTrue(scope, locals));
			});
		};
		return {
			priority: 0,
			require: 'ngModel',
			link: function(scope, iElement, iAttrs, ctrl) {
				// parse expression and build array of disabled options
				var expElements = iAttrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
				var attrToWatch = expElements[3];
				var fnDisableIfTrue = $parse(expElements[1]);
				scope.$watch(attrToWatch, function(newValue, oldValue) {
					if (newValue)
						disableOptions(scope, expElements[2], iElement, newValue, fnDisableIfTrue);
				}, true);
				// handle model updates properly
				scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
					var disOptions = $parse(attrToWatch)(scope);
					if (newValue)
						disableOptions(scope, expElements[2], iElement, disOptions, fnDisableIfTrue);
				});
			}
		};
	});
