var API = 'http://static.gapminder.org.s3.amazonaws.com/prototype/api/';
var CMS_API = 'http://feature_cms-1080-user-api.gapminderdev.org/friends/api/';

angular.module('go.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $http, $rootScope) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.loggedIn = false;

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        //simulate
        $timeout(function() {
            $scope.loggedIn = true;
        }, 1000);
    };

    $scope.signOut = function() {
        console.log('Signing out');
        $scope.loggedIn = false;
    };

    $scope.changeLanguage = function(lang) {
        console.log("Changing language to "+lang);
        $http.get(API + 'navigation_' + lang + '.json').success(function(data) {
            $scope.menu = data;
        });
    };

    $scope.languageList = [{
        text: "English",
        value: "en"
    }, {
        text: "Español",
        value: "es"
    }, {
        text: "Português",
        value: "pt"
    }];

    $scope.selectedLanguage = "en";
    $scope.changeLanguage($scope.selectedLanguage);
})

.controller('HomeCtrl', function($scope, $http) {

    console.log("Getting current media");
    $http.get(API + 'video.json').success(function(data) {
        $scope.media = data;
    });

})

.controller('AboutCtrl', function($scope, $http) {
    console.log("Getting about content");
    $http.get(API + 'about.json').success(function(data) {
        $scope.text = data.text;
    });
})

.controller('ProfileCtrl', function($scope, $stateParams, $http) {

    var profileId = $stateParams.profileId;

    console.log("Getting profile information");

    $http.get(CMS_API + 'user/get?id=' + profileId).success(function(data) {
        $scope.user = data;
        console.log(data);
    });

});