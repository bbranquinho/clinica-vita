"use strict";

angular.module('clinica')
    .controller('ConvenioCtrl',function ( $rootScope,$scope, $mdDialog,  $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $timeout) {
        $rootScope.statusMenu = true;

            var convenioUrl = SERVICE_PATH.PRIVATE_PATH + '/convenio';




            $scope.convenio = {};
            $scope.convenios = [];
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
        $scope.indeter = false;
        $scope.columns = [
            { status: true, name: 'id'},
            { status: true, name: 'registroAns'},
            { status: true, name: 'razaoSocial'},
            { status: true, name: 'medicos'}

        ];
        /* Fim show/hide columns*/




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


        /*Show medicos*/
        $scope.showMedicos = function(medicos,$event) {
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show(

                {
                    templateUrl: 'src/convenio/tables/showMedicos.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: DialogController,
                    controllerAs: 'ctrl',
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,

                    locals: {
                        medicos: medicos

                    }

                }


            ).then(function() {



            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });

            function DialogController($scope, $mdDialog, medicos) {
                $scope.medicos = medicos;

                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        };


        $scope.showConfirm = function(ev) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    var confirm = $mdDialog.confirm()
                        .title('Tem certeza que deseja excluir este Convênio?')
                        .textContent('Caso exclua o mesmo ficará indisponível para manipulação no sistema.')
                        .ariaLabel('Delete Convênio')
                        .targetEvent(ev)
                        .ok('Confirmar!')
                        .cancel('Cancelar');

                    $mdDialog.show(confirm).then(function() {

                            RestSrv.delete(convenioUrl, $scope.selected[0], function(status,data) {

                                    $scope.convenios.splice($scope.convenios.indexOf(convenioUrl), 1);
                                    openToast('convênio \'' + $scope.selected[0].nome + '\' deleted.', 'success');
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




            $scope.editConvenio = function($event,editarconvenio_aux) {

                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
                    console.log(editarconvenio_aux);
                    if(editarconvenio_aux != null){
                            $scope.convenio = editarconvenio_aux;
                    }



                    mdDialog.show({
                            templateUrl: 'src/convenio/dialog/editConvenioDialog.html',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            controller: 'EditConvenioDialogController',
                            controllerAs: 'ctrl',
                            clickOutsideToClose: true,
                            fullscreen: useFullScreen,
                            locals: {
                                    _editarConvenio: $scope.selected,
                                    _editarconvenio_aux: editarconvenio_aux,
                                    _editConvenio: $scope.editConvenio
                            }

                    }). then(function(convenio) { // * Obs fazer de outra forma



                            for(var i = 0 ; i < $scope.convenios.length; i++){
                                    if($scope.convenios[i].id === convenio.id) {
                                            $scope.convenios[i] = convenio;
                                    }
                            }





                            $scope.selected = [];
                            // openToast("Convenio added");
                    }, function () {
                            console.log('You cancelled the dialog.');

                    });


            };

            $scope.formConvenioScope = [];
            $scope.setFormNewConvenioScope = function(scope) {
                    $scope.formConvenioScope = scope;

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

            $scope.addConvenio = function($event,convenio_aux) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
                    console.log('convenio:');
                    console.log(convenio_aux);
                    if(convenio_aux != null){
                            $scope.convenio = convenio_aux;
                    }
                    mdDialog.show({
                            templateUrl: 'src/convenio/dialog/newConvenioDialog.html',
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            controller: 'NewConvenioDialogController',
                            controllerAs: 'ctrl',
                            clickOutsideToClose: true,
                            fullscreen: useFullScreen,
                            locals: {
                                    _addConvenio: $scope.addConvenio,
                                    _convenio_aux: convenio_aux
                            }

                    }).then(function(convenio) { // * Obs fazer de outra forma



                            /* $scope.formConvenioScope.newConvenioForm.$setUntouched();
                             $scope.formConvenioScope.newConvenioForm.$setPristine();*/

                            /* if(convenio.id){
                             RestSrv.edit(convenioUrl, fabricante, function(status, data){
                             if(status ==='ok'){

                             for(var i = 0 ; i < $scope.convenios.length; i++){
                             if($scope.convenios[i].id === convenios.id) {
                             $scope.convenios[i] = convenio;
                             }
                             }

                             $scope.statusError = 'success';
                             $scope.message = data.atributeMessage.MENSAGEM;
                             openToast('convenio \'' + convenio.nome + '\' updated.', 'success');

                             }else{
                             $scope.statusError = 'unsuccess';
                             $scope.messages = data.fieldsErrorMessages;
                             $scope.fields = data.mapOfFields;
                             }


                             });

                             }else{*/
                            /*convenio.dataNascimento = formattedDate(convenio.dataNascimento);
                             convenio.dataAdmissao =  formattedDate(convenio.dataAdmissao);
                             console.log('convenio:');
                             console.log(convenio);

                             // var d = new Date(date || Date.now()),
                             //console.log( date);*/


                            $scope.convenios.push(convenio);
                            /*RestSrv.add(convenioUrl, convenio, function(status,data) {

                             if(status ==='ok'){
                             $scope.convenios.push(data.data);
                             $scope.statusError = 'success';
                             $scope.message = data.atributeMessage.MENSAGEM;


                             openToast('convenio \'' + convenio.nome + '\' added.', 'success');
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
             $scope.convenio.dataNascimento = [day,month , year].join('/');
             /!*
             return [month, day, year].join('/');*!/
             };*/


            $scope.data_loading = true;
            RestSrv.find(convenioUrl, function(status,data) {
                    $timeout(function(){ // give delay for good UI
                            $scope.data_loading = true;
                            $scope.convenios = data;
                            $scope.desserts = $scope.convenios;

                            $scope.data_loading = false;

                    }, 1000);


                    openToast('Loaded Convenios with success.', 'success');


            });





    });