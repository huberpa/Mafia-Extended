angular.module("MafiaApp.role", [
    'ngMaterial',
    'ngRoute'
])

    .controller('roleController', function($scope, $mdDialog, $location, $http, $rootScope) {
        if($rootScope.userName){
            $scope.picture = "ressources/mafia_img.jpg";
            var clicked = false;
            $scope.roleStatus = "Show Role"
            var role = null;

            $http.get('myRole?name='+$rootScope.userName).then(function (response) {
                role = response.data[0].role;
            })

            $scope.confirmRole = function(){
                $location.path('game');
            }

            $scope.showRole = function () {
                if (!clicked) {
                    $scope.roleStatus = "Hide Role"
                    if(role == "Villager"){
                        $scope.picture = "ressources/villager.jpg";
                    }
                    else if(role == "Mafia"){
                        $scope.picture = "ressources/mafia_role.jpg";
                    }
                } else {
                    $scope.roleStatus = "Show Role"
                    $scope.picture = "ressources/mafia_img.jpg";
                }
                clicked = !clicked;
            }
        }else{
        $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('Cannot enter the Game')
                .textContent('Please make sure that you login first before you enter the Game!')
                .ok("OK I'm gunna login first")
            );
        $location.path('login');
        }
    });

