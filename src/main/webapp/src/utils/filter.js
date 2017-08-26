'use strict';


angular.module('clinica')
    .filter('formatPermission', function() {
        return function(input) {
            switch (input) {
                case 'ROLE_ADMIN':
                    return 'Administrator';


                case 'ROLE_PACIENTE':
                    return 'Cliente';


                case 'ROLE_FUNCIONARIO':
                    return 'Funcionário';

                case 'ROLE_MEDICO':
                    return 'Médico';

                case 'ROLE_SECRETARIA':
                    return 'Secretária';

                default:
                    return 'Unknown';

            }
        };
    });
