'use strict';

angular.module('clinica').directive('docsScrollClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {

            var scrollParent = element.parent();
            console.log(scrollParent);
            var isScrolling = false;

            // Initial update of the state.
            updateState();

            // Register a scroll listener, which updates the state.
            scrollParent.on('scroll', updateState);

            function updateState() {

                var newState = scrollParent[0].scrollTop !== 0;

                if (newState !== isScrolling) {
                    console.log('teste1');
                    element.toggleClass(attr.docsScrollClass, newState);
                }

                isScrolling = newState;
            }
        }
    };
});