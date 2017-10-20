'use strict';

angular.module('clinica')
    .directive('mdFormSelectEscala', function () {
        return {
            restric: 'A',
            scope: {
                model: '=',
                options: '=',
                messages: '=',
                name:   '@',
                field: '@',
                label: '@'
            },

            template:
            '                                                <h4>{{field}}*:</h4>\n' +
            '                                                <md-input-container class="md-block" flex-gt-sm>\n' +
            '                                                    <md-select ng-model="model" placeholder="{{label}}" name="{{name}}" required="required" >\n' +
            '\n' +
            '                                                        <md-optgroup label="{{label}}">\n' +
            '                                                            <md-option ng-repeat="horaEntrada in options"\n' +
            '                                                                       ng-value="horaEntrada"\n' +
            '                                                                       ng-disabled="$index === 1" ng-bind="horaEntrada">\n' +
            '                                                            </md-option>\n' +
            '                                                        </md-optgroup>\n' +
            '                                                    </md-select>\n' +
            '                                                    <div ng-messages="messages">\n' +
            '                                                       <div ng-message="required">Campo Obrigatório.</div>\n' +
            '                                                    </div>\n' +
            '                                                </md-input-container>\n'


        }
    }).directive('mdFormSelectEscalaTd', function () {
    return {

        scope: {
            model: '=',
            options: '=',
            messages: '=',
            required:"@",
            name:   '@',
            field: '@',
            label: '@',

        },

        template: '                                                <md-input-container class="md-block" flex-gt-sm>\n' +
        '                                                    <md-select ng-model="model" placeholder="{{field}}" name="{{name}}" required="{{required}}" >\n' +
        '\n' +
        '                                                        <md-optgroup label="{{label}}">\n' +
        '                                                            <md-option ng-repeat="horaEntrada in options"\n' +
        '                                                                       ng-value="horaEntrada"\n' +
        '                                                                        ng-bind="horaEntrada">\n' +
        '                                                            </md-option>\n' +
        '                                                        </md-optgroup>\n' +
        '                                                    </md-select>\n' +
        '                                                    <div ng-messages="messages">\n' +
        '                                                       <div ng-message="required">Campo Obrigatório.</div>\n' +
        '                                                    </div>\n' +
        '                                                </md-input-container>\n'


    }
}).directive('mdFormEscalaAtendimento', function () {
    return {

        scope: {
            diaSemanaModel: '=',
            diaSemanaName: '@',


            periodoModel: '=',
            periodoOptions: '=',
            periodoName: '@',
            periodoMessages: '=',
            periodoField: '@',
            periodoLabel: '@',

            intervaloAgendamentoModel: '=',
            intervaloAgendamentoOptions: '=',
            intervaloAgendamentoName: '@',
            intervaloAgendamentoMessages: '=',
            intervaloAgendamentoField: '@',
            intervaloAgendamentoLabel: '@',

            quantidadeVagasModel: '=',
            quantidadeVagasOptions: '=',
            quantidadeVagasName: '@',
            quantidadeVagasMessages: '=',
            quantidadeVagasField: '@',
            quantidadeVagasLabel: '@',

            tipoAtendimentoModel: '=',
            tipoAtendimentoOptions: '=',
            tipoAtendimentoName: '@',
            tipoAtendimentoMessages: '=',
            tipoAtendimentoField: '@',
            tipoAtendimentoLabel: '@',

            horaEntradaModel: '=',
            horaEntradaOptions: '=',
            horaEntradaName: '@',
            horaEntradaMessages: '=',
            horaEntradaField: '@',
            horaEntradaLabel: '@',

            horaSaidaModel: '=',
            horaSaidaOptions: '=',
            horaSaidaName: '@',
            horaSaidaMessages: '=',
            horaSaidaField: '@',
            horaSaidaLabel: '@',

            horaPausaEntradaModel: '=',
            horaPausaEntradaOptions: '=',
            horaPausaEntradaName: '@',
            horaPausaEntradaField: '@',
            horaPausaEntradaLabel: '@',


            horaPausaTerminoModel: '=',
            horaPausaTerminoOptions: '=',
            horaPausaTerminoName: '@',
            horaPausaTerminoField: '@',
            horaPausaTerminoLabel: '@',


        },
        transclude: true,

        templateUrl: 'appsrc/escala/directive/formEscalaDirective.html'




    }
});

