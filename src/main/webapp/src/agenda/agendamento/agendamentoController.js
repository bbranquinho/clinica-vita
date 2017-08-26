"use strict";

angular.module('clinica')
    .controller('AgendamentoController', function ($scope,$mdToast,$mdDialog,RestSrv,SERVICE_PATH, FormatDate,FormatBDate, $mdMedia,$rootScope) {
        var mdDialog = $mdDialog;
/*

        var findMedicoUrl = SERVICE_PATH.PRIVATE_PATH + "/item_agenda/findByMedico/" + medico.id;
        
        console.log(findMedicoUrl);

       



        RestSrv.find(findMedicoUrl, function(status,data) {


            $scope.agendas = data.data;
            console.log($scope.agendas);




           


        });


*/


        /*dialog Show convenios*/

        $scope.showConvenio = function(medico,$event) {
            console.log('showConvenio');
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show(

                {
                    templateUrl: 'src/agenda/agendamento/dialogConvenio/dialogConvenio.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: DialogConvenioController,
                    controllerAs: 'ctrl',
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,

                    locals: {
                        _medico: medico

                    }

                }


            ).then(function() {



            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });

            function DialogConvenioController($scope, $mdDialog, _medico) {
                $scope.medico = _medico;

                var findConvenioMedicoUrl = SERVICE_PATH.PRIVATE_PATH + "/convenio/findByMedico/" + $scope.medico.id;

                RestSrv.find(findConvenioMedicoUrl, function(status,data) {


                    $scope.conveniosMedico = data.data;
                    console.log(data);


                });

                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        };




        /* Fim show/hide convenios*/



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
           /* console.log('$scope.dataInicialConsulta');
            console.log($scope.dataInicialConsulta);
            console.log('horaInicial');
            console.log(horaInicial);
            console.log('minutoInicial');
            console.log(minutoInicial);*/

            console.log(this.dataInicialConsulta);

            if(this.dataInicialConsulta != undefined && horaInicial != undefined && minutoInicial != undefined){
                    if($scope.elements.medico != undefined && $scope.elements.medico != null){
                        $scope.itemAgenda.medico = $scope.elements.medico;
                    }
                //$scope.itemAgenda.agenda.dataHoraInicialConsulta = 'qwerqer';
                $scope.itemAgenda.agenda.dataHoraInicialConsulta = FormatDate.format(this.dataInicialConsulta)+' ' + horaInicial+':'+ minutoInicial+':'+'00';
            }

            /*if($scope.dataFinalConsulta != undefined && horaFinal != undefined && minutoFinal != undefined){
                //$scope.itemAgenda.agenda.dataHoraInicialConsulta = 'qwerqer';
                $scope.itemAgenda.agenda.dataHoraFinalConsulta = FormatDate.format($scope.dataFinalConsulta)+' ' + horaFinal+':'+ minutoFinal+':'+'00';
            }*/



            // $scope.itemAgenda.agenda.dataHoraInicialConsulta = FormatDate.format($scope.dataInicialConsulta) + $scope.horaInicial+ $scope.horaInicial;




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
                templateUrl: 'src/agenda/agendamento/newAgendamentoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewAgendamentoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _itensAgenda: itemAgenda

                }
            }). then(function(itemAgenda) { // * Obs fazer de outra forma
                console.log('date:');
                console.log(itemAgenda);

                $scope.searchHorarios();

                /*Dispara um evento para atualizar a agenda*/
               // $scope.$broadcast("updateAgenda");


                $rootScope.$broadcast('updateAgenda');



            }, function () {
                console.log('You cancelled the dialog.');

            });


            console.log(itemAgenda);
        };





       /* var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';

        $scope.medico = {};
        $scope.medicos = [];

        RestSrv.find(medicoUrl, function(status,data) {


            $scope.medicos = data.data;



        });*/

       




    });