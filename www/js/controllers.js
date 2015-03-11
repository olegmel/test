var API = 'http://static.gapminder.org.s3.amazonaws.com/prototype/api/';
//var CMS_API = 'http://feature_cms-1080-user-api.gapminderdev.org/friends/api/';

if (typeof require !== 'undefined') {
    var contentful = require('../../index');
}
var client = contentful.createClient({
    accessToken: 'ed258cdfb9cd38edea1dc63e4e8bef81bd3081d8de696f8644f2f238a2b94902',
    space: 'x2gefo3bmio7',entries:'x0luTnPWzA44CAuAgu8UK'
});

angular.module('go.controllers', [])
    .controller('AppCtrl', function($scope, $q,$sce,$http, $timeout, $rootScope){
        $scope.loginData = {};
        $scope.loggedIn = false;
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };
        $scope.login = function() {
            $scope.modal.show();
        };
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);
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


        $scope.space = $q.when(client.space());
        $scope.contentTypes = $q.when(client.contentTypes());
        $scope.name = [];
        $scope.name = $q.when(client.contentTypes().name);
        $scope.contentTypes.then(function(types) {{
            if (!types || !types.length) return;
            $scope.contentType = types[4];


        }});
        $scope.$watch('contentType', function(contentType) {
            if (!contentType) return;
            $scope.entries = $q.when(client.entries({
                order: 'sys.updatedAt',
                content_type: contentType.sys.id
            }));
            console.log($scope.entries);
            $scope.entries.then(function(types) {{
                $scope.media = types[0].fields;
                $scope.video=$scope.media['related'];
                $scope.about = $scope.media['about'];
                $scope.video=$scope.video[0].fields;
                $scope.text = $scope.video['about'];
                var url = $scope.video['youtubeUrl'];
                var watch = url.split('=');
                $scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+ watch[1] +'?showinfo=0&modestbranding=1&rel=0');
                $scope.contents=[];
                $scope.content = $scope.media['content'];
                for(var i=0; i<=$scope.content.data.length-1;i++){
                    if($scope.content.data[i].type == 'text')
                    {
                        $scope.contents.push($scope.content.data[i].data.text);
                    }
                }
            }});
        });

})
    //.controller('HomeCtrl', function($scope, $http) {
    //    console.log("Getting current media");
    //    $http.get(API + 'video.json').success(function(data) {
    //        $scope.media = data;
    //    });
    //})
    //.controller('AboutCtrl', function($scope, $http) {
    //    console.log("Getting about content");
    //    $http.get(API + 'about.json').success(function(data) {
    //        $scope.text = data.text;
    //    });
    //})
    //.controller('ProfileCtrl', function($scope, $stateParams, $http) {
    //    var profileId = $stateParams.profileId;
    //    console.log("Getting profile information");
    //    $http.get(CMS_API + 'user/get?id=' + profileId).success(function(data) {
    //        $scope.user = data;
    //        console.log(data);
    //    });
    //});