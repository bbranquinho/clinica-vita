package org.fpu.clinica.cidade;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = ServicePath.CIDADE_PATH)
public class CidadeService extends GenericService<Cidade, Long> {

}
