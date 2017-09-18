'use strict';

angular.module('clinica')
    .directive('mdFormSelectEscala', function () {
        return {
            restric: 'A',
            scope: {
                model: '=',
                options: '=',
                field: '@',
                label: '@'
            },

            template:
            '                                                <h4>{{field}}*:</h4>\n' +
            '                                                <md-input-container class="md-block" flex-gt-sm>\n' +
            '                                                    <md-select ng-model="model" placeholder="{{label}}">\n' +
            '\n' +
            '                                                        <md-optgroup label="{{label}}">\n' +
            '                                                            <md-option ng-repeat="horaEntrada in options"\n' +
            '                                                                       ng-value="horaEntrada"\n' +
            '                                                                       ng-disabled="$index === 1">\n' +
            '                                                                {{horaEntrada}}\n' +
            '                                                            </md-option>\n' +
            '                                                        </md-optgroup>\n' +
            '                                                    </md-select>\n' +
            '\n' +
            '                                                </md-input-container>\n'


        }
    }).directive('mdFormSelectEscalaTd', function () {
    return {

        scope: {
            model: '=',
            options: '=',
            field: '@',
            label: '@'
        },

        template: '                                                <md-input-container class="md-block" flex-gt-sm>\n' +
        '                                                    <md-select ng-model="model" placeholder="{{field}}">\n' +
        '\n' +
        '                                                        <md-optgroup label="{{label}}">\n' +
        '                                                            <md-option ng-repeat="horaEntrada in options"\n' +
        '                                                                       ng-value="horaEntrada"\n' +
        '                                                                       ng-disabled="$index === 1">\n' +
        '                                                                {{horaEntrada}}\n' +
        '                                                            </md-option>\n' +
        '                                                        </md-optgroup>\n' +
        '                                                    </md-select>\n' +
        '\n' +
        '                                                </md-input-container>\n'


    }
});