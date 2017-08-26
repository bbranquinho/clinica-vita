"use strict";

angular.module('clinica')

    .controller('MedicoCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$timeout)  {
        $rootScope.statusMenu = true;
        var medicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico';


      

        $scope.medico = {};
        $scope.medicos = [];
        $scope.order = 'nome';

        $scope.determinateValue = 0;
        $timeout(function(){ // give delay for good UI
            while( $scope.determinateValue < 100){
                $scope.determinateValue++;
            }



        }, 1000);




        var mdDialog = $mdDialog;


        this.cancel = $mdDialog.cancel;




        var bookmark;

        $scope.selected = [];

        $scope.filter = {
            options: {
                debounce: 500
            }
        };

        $scope.query = {
            filter: '',
            limit: '5',
            order: 'nameToLower',
            page: 1
        };


        $scope.reorder = function(campo) {
                $scope.order = campo;
        };



        /*show/hide columns*/
        $scope.indeter= false;
        $scope.columns = [
            { status: true, name: 'Id'},
            { status: true, name: 'Foto'},
            { status: true, name: 'Tipo Registro'},
            { status: false, name: 'Estado Registro'},
            { status: true, name: 'Registro Profissional'},
            { status: false, name: 'RG'},
            { status: false, name: 'CPF'},
            { status: false, name: 'Data Nascimento'},
            { status: false, name: 'Cargo'},
            { status: false, name: 'Setor'},
            { status: false, name: 'Especialidade'},
            { status: false, name: 'Data Admissão'},
            { status: false, name: 'Telefone'},
            { status: false, name: 'Sexo'},
            { status: false, name: 'CEP'},
            { status: false, name: 'Rua'},
            { status: false, name: 'Bairro'},
            { status: false, name: 'Cidade'},
            { status: false, name: 'Estado'},
            { status: false, name: 'Número'},
            { status: false, name: 'Email'},
            { status: true, name: 'Status'}


        ];

        /*dialog Show columsn*/
        
        $scope.showColumns = function($event) {
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show(

                {
                    templateUrl: 'src/fragments/showColumns.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: DialogController,
                    controllerAs: 'ctrl',
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,

                    locals: {
                        columns: $scope.columns,
                        indeter: $scope.indeter
                    }

                }


            ).then(function() {



            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });

            function DialogController($scope, $mdDialog, columns, indeter) {
                $scope.columns = columns;
                $scope.indeter = indeter;
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        };




        /* Fim show/hide columns*/


      

      

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Tem certeza que deseja excluir este Medico?')
                .textContent('Caso exclua o mesmo ficará indisponível para manipulação no sistema.')
                .ariaLabel('Delete Medico')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {

                RestSrv.delete(medicoUrl, $scope.selected[0], function(status,data) {

                    $scope.medicos.splice($scope.medicos.indexOf(medicoUrl), 1);
                    openToast('medico \'' + $scope.selected[0].nome + '\' deleted.', 'success');
                    $scope.selected = [];
                });

            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };






        




        $scope.getDesserts = function(){
            $scope.myLimit = $scope.query.limit;
            $scope.myPage = $scope.query.page;

        };

        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        $scope.$watch('query.filter', function (newValue, oldValue) {
            if(!oldValue) {
                bookmark = $scope.query.page;
            }

            if(newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if(!newValue) {
                $scope.query.page = bookmark;
            }

            $scope.getDesserts();
        });


        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };




        $scope.editMedico = function($event,editarmedico_aux) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log(editarmedico_aux);
            if(editarmedico_aux != null){
                $scope.medico = editarmedico_aux;
            }



            mdDialog.show({
                templateUrl: 'src/medico/dialog/editMedicoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditMedicoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarMedico: $scope.selected,
                    _editarmedico_aux: editarmedico_aux,
                    _editMedico: $scope.editMedico
                }

            }). then(function(medico) { // * Obs fazer de outra forma



                        for(var i = 0 ; i < $scope.medicos.length; i++){
                            if($scope.medicos[i].id === medico.id) {
                                $scope.medicos[i] = medico;
                            }
                        }





                $scope.selected = [];
               // openToast("Medico added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


        };

        $scope.formMedicoScope = [];
        $scope.setFormNewMedicoScope = function(scope) {
            $scope.formMedicoScope = scope;

        };


       /* function formattedDate(date) {

            // var d = new Date(date || Date.now()),
            console.log(date);
            var d = date,
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }
            console.log([day, month, year].join('/'));



            return [day, month, year].join('/');
        }
*/

        $scope.addMedico = function($event,medico_aux) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log('medico:');
            console.log(medico_aux);
            if(medico_aux != null){
                $scope.medico = medico_aux;
            }
            mdDialog.show({
                templateUrl: 'src/medico/dialog/newMedicoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewMedicoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _addMedico: $scope.addMedico,
                    _medico_aux: medico_aux
                }

            }).then(function(medico) { // * Obs fazer de outra forma



                /* $scope.formMedicoScope.newMedicoForm.$setUntouched();
                 $scope.formMedicoScope.newMedicoForm.$setPristine();*/

               /* if(medico.id){
                    RestSrv.edit(medicoUrl, fabricante, function(status, data){
                        if(status ==='ok'){

                            for(var i = 0 ; i < $scope.medicos.length; i++){
                                if($scope.medicos[i].id === medicos.id) {
                                    $scope.medicos[i] = medico;
                                }
                            }

                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;
                            openToast('medico \'' + medico.nome + '\' updated.', 'success');

                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                        }


                    });

                }else{*/
                   /*medico.dataNascimento = formattedDate(medico.dataNascimento);
                   medico.dataAdmissao =  formattedDate(medico.dataAdmissao);
                    console.log('medico:');
                    console.log(medico);

                    // var d = new Date(date || Date.now()),
                    //console.log( date);*/


                    $scope.medicos.push(medico);
                    /*RestSrv.add(medicoUrl, medico, function(status,data) {

                        if(status ==='ok'){
                            $scope.medicos.push(data.data);
                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;


                            openToast('medico \'' + medico.nome + '\' added.', 'success');
                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                            console.log(data);
                        }

                    });
                }*/


            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


      /*  $scope.formattedDate = function(date) {

            // var d = new Date(date || Date.now()),
            console.log( date);
            var d = date.dataNascimento,
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) {month = '0' + month;}
            if (day.length < 2) {day = '0' + day;}
            console.log( [day,month , year].join('/'));
            var dataTest = new Date(year + '/' + month + '/' + day);
            console.log(dataTest);
            $scope.medico.dataNascimento = [day,month , year].join('/');
            /!*
             return [month, day, year].join('/');*!/
        };*/


        $scope.data_loading = true;
        RestSrv.find(medicoUrl, function(status,data) {
            $timeout(function(){ // give delay for good UI
                $scope.data_loading = true;
                $scope.medicos = data;
                $scope.desserts = $scope.medicos;

                $scope.data_loading = false;

            }, 1000);


            openToast('Loaded Medicos with success.', 'success');


        });
        
        

       

    });

