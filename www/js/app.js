angular.module('go', ['ui.router', 'go.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                controller: 'AppCtrl',
                templateUrl: "templates/navigation.html"
            })
            .state('app.search', {
                url: "/search",
                views: {
                    'mainContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })
            .state('app.home', {
                url: "/home",
                views: {
                    'mainContent': {
                        templateUrl: "templates/home.html"
                        //,
                        //controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.about', {
                url: "/about",
                views: {
                    'mainContent': {
                        templateUrl: "templates/about.html"
                        //,
                        //controller: 'AboutCtrl'
                    }
                }
            })
            .state('app.profile', {
                url: "/profile/:profileId",
                views: {
                    'mainContent': {
                        templateUrl: "templates/profile.html"
                        //,controller: 'ProfileCtrl'
                    }
                }
            });
// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });