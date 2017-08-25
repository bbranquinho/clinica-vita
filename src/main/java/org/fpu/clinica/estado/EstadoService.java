package org.fpu.clinica.estado;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = ServicePath.ESTADO_PATH)
public class EstadoService extends GenericService<Estado, Long> {

}
