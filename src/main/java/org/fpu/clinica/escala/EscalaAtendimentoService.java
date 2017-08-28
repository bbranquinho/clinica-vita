package org.fpu.clinica.escala;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.ESCALA_ATENDIMENTO_PATH)
public class EscalaAtendimentoService extends GenericService<EscalaAtendimento, Long> {

	@Autowired
	private EscalaAtendimentoRepository escalaAtendimentoRepository;

	
}
