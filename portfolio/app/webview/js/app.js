// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'chart.js','ionicLazyLoad'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            })

        })
        .controller('experienceController', function ($scope, $http, $state, $cordovaInAppBrowser) {
//            $http.get('data/experience.json').success(function (data)
            if (ionic.Platform.isAndroid())
            {
                $http.get('http://shenlongzhen.com/dataJSON/experience.json').success(function (data)
                {
                    $scope.experience = data;
                    $scope.whichExp = $state.params.eId;
                });
            } else {
                $http.get('data/experience.json').success(function (data)
                {
                    $scope.experience = data;
                    $scope.whichExp = $state.params.eId;
                });
            }

            $scope.toggleGroup = function (list) {
                if ($scope.isGroupShown(list)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = list;
                }
            };
            $scope.isGroupShown = function (list) {
                return $scope.shownGroup === list;
            };
            $scope.openLinkSys = function (url) {
                var options = {
                    location: 'yes',
                    closebuttoncaption: 'Return',
                    toolbar: 'yes'
                };
                $cordovaInAppBrowser.open(url, '_system', options)
                return false;
            }

        })
        .controller('aboutController', function ($scope, $cordovaAppVersion) {
            $scope.deviceInformation = ionic.Platform.device();
            $scope.isWebView = ionic.Platform.isWebView();
            $scope.isIPad = ionic.Platform.isIPad();
            $scope.isIOS = ionic.Platform.isIOS();
            $scope.isAndroid = ionic.Platform.isAndroid();
            $scope.isWindowsPhone = ionic.Platform.isWindowsPhone();
            $scope.currentPlatform = ionic.Platform.platform();
            $scope.currentPlatformVersion = ionic.Platform.version();
            document.addEventListener("deviceready", function () {
                $cordovaAppVersion.getAppVersion().then(function (version) {
                    $scope.appVersion = version;
                });
            }, false);
        })
        .controller('referenceController', function ($scope, $http, $state) {
            if (ionic.Platform.isAndroid()) {
                $http.get('http://shenlongzhen.com/dataJSON/reference.json').success(function (data) {
                    $scope.reference = data;
                })
            } else {
                $http.get('data/reference.json').success(function (data) {
                    $scope.reference = data;
                })
            }
        })
        .controller('summaryController', function ($scope, $http, $state, $cordovaInAppBrowser) {
            if (ionic.Platform.isAndroid()) {
                $http.get('http://shenlongzhen.com/dataJSON/summary.json').success(function (data) {
                    $scope.summary = data;
                    $scope.label = data.labels;
                    $scope.value = [data.values];
                })
            } else {
                $http.get('data/summary.json').success(function (data) {
                    $scope.summary = data;
                    $scope.label = data.labels;
                    $scope.value = [data.values];
                })
            }
            $scope.options = {
                //String - Colour of the angle line
                angleLineColor: "rgba(0,0,0,.1)",
                //Number - Pixel width of the angle line
                angleLineWidth: 1,
                //String - Point label font declaration
                pointLabelFontFamily: "'Arial'",
                //String - Point label font weight
                pointLabelFontStyle: "normal",
                //Number - Point label font size in pixels
                pointLabelFontSize: 12,
                //String - Point label font colour
                pointLabelFontColor: "snow",
                //Number - Radius of each point dot in pixels
                pointDotRadius: 3,
                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 2,
            };
            $scope.openLinkSys = function (url) {
                var options = {
                    location: 'yes',
                    closebuttoncaption: 'Return',
                    toolbar: 'yes'
                };
                $cordovaInAppBrowser.open(url, '_system', options)
                return false;
            }

        })
        .controller('portfolioController', function ($scope, $http, $state, $ionicModal, $ionicSlideBoxDelegate, $cordovaInAppBrowser) {
            if (ionic.Platform.isAndroid()) {
                $http.get('http://shenlongzhen.com/dataJSON/portfolio.json').success(function (data) {
                    $scope.portfolio = data;
                })
            } else {
                $http.get('data/portfolio.json').success(function (data) {
                    $scope.portfolio = data;
                })
            }

            $ionicModal.fromTemplateUrl('templates/portfolioModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function (data, index) {
                $scope.images = data;
                $ionicSlideBoxDelegate.slide(index);
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
            };

            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hide', function () {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });
            $scope.$on('modal.shown', function () {
                // Execute action
            });

            // Call this functions if you need to manually control the slides
            $scope.next = function () {
                $ionicSlideBoxDelegate.next();
            };

            $scope.previous = function () {
                $ionicSlideBoxDelegate.previous();
            };

            // Called each time the slide changes
            $scope.slideChanged = function (index) {
                $scope.slideIndex = index;
            };

            $scope.openLinkSys = function (url) {
                var options = {
                    location: 'yes',
                    closebuttoncaption: 'Return',
                    toolbar: 'yes'
                };
                $cordovaInAppBrowser.open(url, '_system', options)
                return false;
            }
            $scope.options = {
                //Number - Point label font size in pixels
                pointLabelFontSize: 11,
                //String - Point label font colour
                pointLabelFontColor: "snow",
                //Number - Radius of each point dot in pixels
                pointDotRadius: 2,
            };
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('menus', {
                        url: '/menus',
                        abstract: true,
                        templateUrl: 'templates/sidemenu.html'
                    })

                    .state('menus.home', {
                        url: "/home",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/home.html'
                            }
                        }
                    })
                    .state('menus.summary', {
                        url: "/summary",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/summary.html',
                                controller: 'summaryController'
                            }
                        }
                    })
                    .state('menus.experience', {
                        url: "/experience",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/experience.html',
                                controller: 'experienceController'
                            }
                        }
                    })
                    .state('menus.expDetail', {
                        url: "/expDetail/:eId",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/expDetail.html',
                                controller: 'experienceController'
                            }
                        }
                    })
                    .state('menus.portfolio', {
                        url: "/portfolio",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/portfolio.html',
                                controller: 'portfolioController'
                            }
                        }
                    })
                    .state('menus.education', {
                        url: "/education",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/education.html'
                            }
                        }
                    })
                    .state('menus.reference', {
                        url: "/reference",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/reference.html',
                                controller: 'referenceController'
                            }
                        }
                    })
                    .state('menus.about', {
                        url: "/about",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/about.html',
                                controller: 'aboutController'
                            }
                        }
                    })
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/menus/home');
        });
