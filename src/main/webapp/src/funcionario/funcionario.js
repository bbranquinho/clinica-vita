"use strict";

angular.module('clinica')

    .controller('FuncionarioCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$timeout)  {
        $rootScope.statusMenu = true;
        var funcionarioUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario';

        $scope.funcionario = {};
        $scope.funcionarios = [];
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
            { status: true, name: 'Matricula'},
            { status: false, name: 'RG'},
            { status: false, name: 'CPF'},
            { status: false, name: 'Data Nascimento'},
            { status: false, name: 'Cargo'},
            { status: false, name: 'Setor'},
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
                .title('Tem certeza que deseja excluir este Funcionario?')
                .textContent('Caso exclua o mesmo ficará indisponível para manipulação no sistema.')
                .ariaLabel('Delete Funcionario')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {

                RestSrv.delete(funcionarioUrl, $scope.selected[0], function(status,data) {

                    $scope.funcionarios.splice($scope.funcionarios.indexOf(funcionarioUrl), 1);
                    openToast('funcionario \'' + $scope.selected[0].user.nome + '\' deleted.', 'success');
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




        $scope.editFuncionario = function($event,editarfuncionario_aux) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log(editarfuncionario_aux);
            if(editarfuncionario_aux != null){
                $scope.funcionario = editarfuncionario_aux;
            }



            mdDialog.show({
                templateUrl: 'src/funcionario/dialog/editFuncionarioDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditFuncionarioDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarFuncionario: $scope.selected,
                    _editarfuncionario_aux: editarfuncionario_aux,
                    _editFuncionario: $scope.editFuncionario
                }

            }). then(function(funcionario) { // * Obs fazer de outra forma

                for(var i = 0 ; i < $scope.funcionarios.length; i++){
                    if($scope.funcionarios[i].id === funcionario.id) {
                        $scope.funcionarios[i] = funcionario;
                    }
                }

               /* RestSrv.edit(funcionarioUrl, funcionario, function(status, data){
                    if(status ==='ok'){

                        for(var i = 0 ; i < $scope.funcionarios.length; i++){
                            if($scope.funcionarios[i].id === funcionario.id) {
                                $scope.funcionarios[i] = funcionario;
                            }
                        }

                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;
                        openToast('funcionario \'' + funcionario.nome + '\' updated.', 'success');

                    }else{
                        $scope.statusError = 'unsuccess';
                        $scope.messages = data.fieldsErrorMessages;
                        $scope.fields = data.mapOfFields;
                    }


                });*/
                $scope.selected = [];
               // openToast("Funcionario added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


        };

        $scope.formFuncionarioScope = [];
        $scope.setFormNewFuncionarioScope = function(scope) {
            $scope.formFuncionarioScope = scope;

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

        $scope.addFuncionario = function($event,funcionario_aux) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log('funcionario:');
            console.log(funcionario_aux);
            if(funcionario_aux != null){
                $scope.funcionario = funcionario_aux;
            }
            mdDialog.show({
                templateUrl: 'src/funcionario/dialog/newFuncionarioDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewFuncionarioDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _addFuncionario: $scope.addFuncionario,
                    _funcionario_aux: funcionario_aux
                }

            }).then(function(funcionario) { // * Obs fazer de outra forma



                /* $scope.formFuncionarioScope.newFuncionarioForm.$setUntouched();
                 $scope.formFuncionarioScope.newFuncionarioForm.$setPristine();*/

               /* if(funcionario.id){
                    RestSrv.edit(funcionarioUrl, fabricante, function(status, data){
                        if(status ==='ok'){

                            for(var i = 0 ; i < $scope.funcionarios.length; i++){
                                if($scope.funcionarios[i].id === funcionarios.id) {
                                    $scope.funcionarios[i] = funcionario;
                                }
                            }

                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;
                            openToast('funcionario \'' + funcionario.user.nome + '\' updated.', 'success');

                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                        }


                    });

                }else{*/
                   /*funcionario.dataNascimento = formattedDate(funcionario.dataNascimento);
                   funcionario.dataAdmissao =  formattedDate(funcionario.dataAdmissao);
                    console.log('funcionario:');
                    console.log(funcionario);

                    // var d = new Date(date || Date.now()),
                    //console.log( date);*/
                    $scope.funcionarios.push(funcionario);


                 /*   RestSrv.add(funcionarioUrl, funcionario, function(status,data) {

                        if(status ==='ok'){
                            $scope.funcionarios.push(data.data);
                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;


                            openToast('funcionario \'' + funcionario.user.nome + '\' added.', 'success');
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
            $scope.funcionario.dataNascimento = [day,month , year].join('/');
            /!*
             return [month, day, year].join('/');*!/
        };*/


        $scope.data_loading = true;
        RestSrv.find(funcionarioUrl, function(status,data) {

            $timeout(function(){ // give delay for good UI
                $scope.data_loading = true;
                $scope.funcionarios = data;
                $scope.desserts = $scope.funcionarios;

                $scope.data_loading = false;

            }, 1000);


            openToast('Loaded Funcionarios with success.', 'success');


        });
        
        

       

    });

