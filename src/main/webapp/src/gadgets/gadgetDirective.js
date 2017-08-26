'use strict';

angular.module('clinica')
    .directive('gadget', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attr) {
                element.removeAttr('gadget');
                element.attr(attr.gadget, '');
                $compile(element)(scope);
            }
        };

    }) .directive('gadgetheader', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attr) {






            //element.attr(attr.gadgetheader, '');
/*
            console.log('scope:');
            console.log(scope);
 */



            element.removeAttr('gadgetheader');
            console.log('attr:');
            console.log(attr.gadgetheader);
            //element.attr(scope.gadget.template,'');

            element.append(attr.gadgetheader);

            $compile(element)(scope);
        }
    };

}).directive('gadgetgrafic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attr) {






            //element.attr(attr.gadgetheader, '');
            /*
             console.log('scope:');
             console.log(scope);
             */



            element.removeAttr('gadgetgrafic');
            console.log('attr:');
            console.log(attr.gadgetgrafic);
            //element.attr(scope.gadget.template,'');

            element.append(attr.gadgetgrafic);

            $compile(element)(scope);
        }
    };

});