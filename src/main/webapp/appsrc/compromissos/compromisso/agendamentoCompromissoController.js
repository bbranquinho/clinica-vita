"use strict";

angular.module('clinica')
    .controller('AgendamentoCompromissoController', function ($scope,$mdToast,$mdDialog,RestSrv,SERVICE_PATH, FormatDate,FormatBDate, $mdMedia,$rootScope) {
        var mdDialog = $mdDialog;


        $scope.elements = {};

        Date.prototype.addDias = function(dias){
            this.setDate(this.getDate() + dias)
        };




        /*Data Minima e Maxima para Agendamento*/
        var dias = 7;
        $scope.dataMinina  = new Date();
        $scope.dataMinina.addDias(1);
        $scope.dataMaxima = new Date();
        $scope.dataMaxima.addDias(dias);
        /*--Fim Data Minima e Maxima para Agendamento*/

        $scope.initParamenters = {showPesquisa: true , showCardTable: true , showResultHorarios:false};
        $scope.medico = {};
        $scope.setMedico = function(elements){
            if(elements != null) {
                $scope.medico = elements;
            }

        }


        $scope.itemAgenda = {};
        $scope.itensAgenda = [];


        $scope.searchHorarios = function(){
            console.log($scope.elements.medico.id);
            console.log($scope.elements.datasDiponiveis);

            var dataSearch = FormatBDate.format($scope.elements.datasDiponiveis);

            var itemAgendaUrl = SERVICE_PATH.PRIVATE_PATH +'/item_agenda/find_horario_agendamento/'+ dataSearch + '/'+ $scope.elements.medico.id ;
            //http://localhost:8080/api/private/item_agenda/find_horario_agendamento/15-06-2017/3



            RestSrv.find(itemAgendaUrl, function(status,data) {


                $scope.itensAgenda = data;
                $scope.initParamenters.showResultHorarios = true;


            });
        }




        var horaInicial,horaFinal,minutoInicial,minutoFinal;
        $scope.formattimepiker = function(fieldData,time) {


            if (time < 10 && time != null ){
                time = '0' + String(time);
            }



            if($scope.itemAgenda.agenda === undefined){
                var agenda = {agenda:{}};
                angular.merge($scope.itemAgenda, agenda);
            }


            if(fieldData === 'horaInicial'){horaInicial = time; }
            if(fieldData === 'horaFinal'){horaFinal = time; }
            if(fieldData === 'minutoInicial'){minutoInicial = time; }
            if(fieldData === 'minutoFinal'){minutoFinal = time; }


            console.log(this.dataInicialConsulta);

            if(this.dataInicialConsulta != undefined && horaInicial != undefined && minutoInicial != undefined){
                if($scope.elements.medico != undefined && $scope.elements.medico != null){
                    $scope.itemAgenda.medico = $scope.elements.medico;
                }
                //$scope.itemAgenda.agenda.dataHoraInicialConsulta = 'qwerqer';
                $scope.itemAgenda.agenda.dataHoraInicialConsulta = FormatDate.format(this.dataInicialConsulta)+' ' + horaInicial+':'+ minutoInicial+':'+'00';
            }


            console.log(time);


        };




        $scope.persquisarHorarios = function(){
            if($scope.elements.medico != undefined && $scope.elements.medico != null){
                $scope.itemAgenda.medico = $scope.elements.medico;
            }


        }

        $scope.medicos = [];
        var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo' ;

        console.log(medicoUrl);

        RestSrv.find(medicoUrl, function(status,data) {


            $scope.medicos = data.data;



        });



        $scope.novoAgendamento = function ($event,itemAgenda) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'appsrc/compromissos/compromisso/newAgendamentoCompromissoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewAgendamentoCompromissoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _itensAgenda: itemAgenda

                }
            }). then(function(itemAgenda) {
                console.log('date:');
                console.log(itemAgenda);

                $scope.searchHorarios();

                /*Dispara um evento para atualizar a agenda*/
                // $scope.$broadcast("updateAgenda");


                $rootScope.$broadcast('updateAgendaCompromisso');



            }, function () {
                console.log('You cancelled the dialog.');

            });


            console.log(itemAgenda);
        };
        

    });