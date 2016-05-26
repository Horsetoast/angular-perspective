(function() {
    'use strict';

    angular
        .module('ngPerspective', [])
        .provider('ngPerspectiveConfig', function ngPerspectiveConfig() {
            this.config = {};
            this.$get = function() {
                return this;
            };
        })
        .directive('ngPerspective', ngPerspective);

    ngPerspective.$inject = ['$window'];

    function ngPerspective($window) {
        var directive = {
            restrict: 'A',
            scope: {
                moveX: '=',
                moveY: '=',
                moveZ: '=',
                rotateZ: '='
            },
            link: linkFunc,
            controller: ['ngPerspectiveConfig', ngPerspectiveCtrl],
            controllerAs: 'vm'
        };

        return directive;

        function linkFunc(scope, el, attr, vm) {
            var elCenterX, elCenterY, elOffset,
                doc = document.documentElement,
                body = document.body;
            initialize();
            angular.element($window).bind("resize", initialize);

            function initialize() {
                if (vm.config.focalPoint === "parent") {
                    angular.element(angular.element(el[0]).parent()[0]).bind("mousemove", updateElement);
                } else {
                    angular.element($window).bind("mousemove", updateElement);
                }

                elOffset = getOffset(el[0]);
                elCenterX = elOffset.left + (el.prop('clientWidth') / 2);
                elCenterY = elOffset.top + (el.prop('clientHeight') / 2);
            }

            function getOffset(el) {
                var box = el.getBoundingClientRect();

                var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop;
                var scrollLeft = window.pageXOffset || doc.scrollLeft || body.scrollLeft;

                var clientTop = doc.clientTop || body.clientTop || 0;
                var clientLeft = doc.clientLeft || body.clientLeft || 0;

                var top = box.top + scrollTop - clientTop;
                var left = box.left + scrollLeft - clientLeft;

                return {
                    top: top,
                    left: left
                };
            }

            function getMouseXY(event) {
                var e = event || window.event;

                var mouse = [];
                mouse.x = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
                mouse.y = e.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
                return mouse;
            }

            function updateElement(event) {
                var mouse = getMouseXY(event);
                var element = angular.element(el[0]);
                var parent = element.parent()[0];
                var x, y;

                if (vm.config.focalPoint === 'elements') {
                    x = elCenterX - mouse.x;
                    y = elCenterY - mouse.y;
                } else if (vm.config.focalPoint === 'window') {
                    x = $window.innerHeight / 2 - mouse.x;
                    y = $window.innerHeight / 2 - mouse.y;
                } else if (vm.config.focalPoint === 'parent') {
                    x = parent.offsetLeft + (angular.element(el[0]).parent()[0].clientWidth / 2) - mouse.x;
                    y = parent.offsetTop + (angular.element(el[0]).parent()[0].clientHeight / 2) - mouse.y;
                }

                /* Collect ngPerspective args supplied to element */
                var args = {};

                args.moveX = scope.moveZ ? (x * scope.moveZ) : (x * scope.moveX);
                args.moveY = scope.moveZ ? (y * scope.moveZ) : (y * scope.moveY);

                args.xRotate = scope.rotateZ ? (x * scope.rotateZ) : (x * scope.moveX);
                args.yRotate = scope.rotateZ ? (y * scope.rotateZ) : (y * scope.moveY);

                // Apply global multiplicator to all elements
                Object.keys(args).map(function(value, index) {
                    args[value] = args[value] / vm.config.perspectiveFactor;
                });

                transform(args);
            }

            function transform(args) {
                var transformCSS = "";

                if (scope.rotateZ) {
                    transformCSS += 'perspective( 600px ) rotateY( ' + -args.xRotate + 'deg ) rotateX( ' + args.yRotate + 'deg )';
                }
                if (scope.moveZ) {
                    transformCSS += 'translate(' + args.moveX + 'px, ' + args.moveY + 'px)';
                }
                if (scope.moveX && !scope.moveY && !scope.moveZ) {
                    transformCSS += 'translateX(' + args.moveX + 'px)';
                }
                if (!scope.moveX && scope.moveY && !scope.moveZ) {
                    transformCSS += 'translateY(' + args.moveY + 'px)';
                }
                if (scope.moveX && scope.moveY && !scope.moveZ) {
                    transformCSS += 'translate(' + args.moveX + 'px, ' + args.moveY + 'px)';
                }

                el.css('transform', transformCSS);
            }
        }

        function ngPerspectiveCtrl(ngPerspectiveConfig) {
            var vm = this;
            vm.config = {
                'focalPoint': 'parent',
                /* options: (elements, window, parent) */
                'perspectiveFactor': 10
                    /* global multiplicator */
            };

            // Interpolate config settings
            Object.keys(ngPerspectiveConfig.config).map(function(value, index) {
                vm.config[value] = ngPerspectiveConfig.config[value];
            });

            return vm;
        }
    }

})();
