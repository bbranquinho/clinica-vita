
angular.module('clinica').directive('listPerfil',function () {
    return {

        scope: {
            objectkey: '@',
            valuelist: '@',
        },
        template: '<md-list-item class="secondary-button-padding"><p class="md-subheader">{{objectkey}}:</p> <p>{{valuelist}}</p> </md-list-item><md-divider></md-divider>'



    };

}).directive('perfilinfo', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attr) {






            //element.attr(attr.gadgetheader, '');
            /*
             console.log('scope:');
             console.log(scope);
             */



            element.removeAttr('perfilinfo');
            console.log('attr:');
            console.log(attr.perfilinfo);
            //element.attr(scope.gadget.template,'');

            element.append(attr.perfilinfo);

            $compile(element)(scope);
        }
    };

});
