package org.fpu.clinica.bairro;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = ServicePath.BAIRRO_PATH)
public class BairroService extends GenericService<Bairro, Long> {

}
