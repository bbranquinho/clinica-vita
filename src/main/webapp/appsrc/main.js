'use strict';

angular.module('clinica')
    .controller('mainController', function ($scope,$mdSidenav,UserService, $mdToast, $mdDialog, $mdMedia, $mdBottomSheet,LoginLogoutSrv,$location,$rootScope) {



        $scope.logout = function() {
            LoginLogoutSrv.logout();
            $location.path('/');
        };

        $scope.hasAnyPermission = function(authorities) {
            var hasPermission = false;

            $rootScope.authDetails.permissions.forEach(function(permission) {
                authorities.forEach(function(authority) {
                    if (permission.authority === authority) {
                        hasPermission = true;
                    }
                });
            });



            return hasPermission;
        };


        /*Atualiza o perfil in current user*/

        $rootScope.$on('updateCurrentUserPerfil',function (event,data) {

            $rootScope.authDetails.name = data.user.nome;
            $rootScope.authDetails.permissions[0].authority = data.user.permissoes[0].role;
            $rootScope.authDetails.file = data.user.fileUpload;

        });


        var mdDialog = $mdDialog;
        this.$mdSidenav = $mdSidenav;

        $scope.selected = null;
        $scope.searchText = '';
        $scope.tabindex = 0;
        $scope.users = [];

        var Note = (function () {
            function Note(title, date) {
                this.title = title;
                this.date = date;
            }
            return Note;
        })();

        $scope.newNote = new Note('', null);

        $scope.users  = UserService.loadAllUsers();

             $scope.selected = $scope.users[0];
             UserService.setSelected($scope.selected);
             console.log($scope.users);



        $scope.toggleSideNav = function () {
            console.log("oi");
            $mdSidenav('left').toggle();
        };




        $scope.selectUser = function (user) {
            console.log('oi');
            $scope.selected = user;
            UserService.setSelected(user);

            var sidenav = $mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }

            $scope.tabindex = 0;

        };

        $scope.showContactOptions = function($event) {
            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('wrapper')),
                templateUrl: 'src/contact/ContactSheet.html',
                controller: 'ContactPanelController',
                controllerAs: "cp",
                bindToController: true,
                targetEvent: $event

            }).then(function(clickedItem){
                //clickedItem && console.log(clickedItem.name + 'clicked!');
            });
        };

        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };




        $scope.addUser = function($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

           mdDialog.show({
                templateUrl: 'src/user/newUserDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'AddUserDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen

            }).then(function(user) { // * Obs fazer de outra forma

                var createUser = (function () {
                    function User(name, avatar, bio, notes) {
                        this.name = name;
                        this.avatar = avatar;
                        this.bio = bio;
                        this.notes = notes;
                    }
                    User.fromCreate = function (user) {
                        return new User(user.firstName + ' ' + user.lastName, user.avatar, user.bio, []);
                    };
                    return User;
                })();


                var newUser = createUser.fromCreate(user);
                $scope.users.push(newUser);
                UserService.setSelected(newUser);
                openToast("User added");
            }, function () {
                console.log('You cancelled the dialog.');

            });

           
        };

        $scope.setFormScope = function (scope) {
            $scope.formScope = scope;
        };

        $scope.addNote = function() {
            $scope.selected.notes.push($scope.newNote);

            $scope.formScope.noteForm.$setUntouched();
            $scope.formScope.noteForm.$setPristine();
            $scope.newNote = new Note('', null);
            openToast("Note added");
        }

        $scope.removeNote = function(note) {
            var foundIndex = $scope.selected.notes.indexOf(note);
            $scope.selected.notes.splice(foundIndex, 1);
            openToast("Note Was removed");
        };

        $scope.clearNotes = function($event) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete all notes?')
                .textContent('All notes will be deleted, you can\'t undo this action.')
                .targetEvent($event)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                $scope.selected.notes = [];
                openToast('Cleared notes');
            });
        };

        var originatorEv;
        this.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        $scope.announceClick = function(index) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('You clicked!')
                    .textContent('You clicked the menu item at index ' + index)
                    .ok('Nice')
                    .targetEvent(originatorEv)
            );
            originatorEv = null;
        };


    });
