"use strict";

angular.module('clinica')
    .controller('ContactPanelController', function ($scope,UserService, $mdBottomSheet) {
        
        $scope.user = UserService.getSelected();
        $scope.actions = [
            { name: 'Phone', icon: 'phone' },
            { name: 'Twitter', icon: 'twitter' },
            { name: 'Google+', icon: 'google_plus' },
            { name: 'Hangout', icon: 'hangouts' }
        ];

        $scope.submitContact = function(action) {
            $mdBottomSheet.hide(action);
        };
    });