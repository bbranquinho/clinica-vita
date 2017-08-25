package org.fpu.clinica.logradouro;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = ServicePath.LOGRADOURO_PATH)
public class LogradouroService extends GenericService<Logradouro, Long> {

}
