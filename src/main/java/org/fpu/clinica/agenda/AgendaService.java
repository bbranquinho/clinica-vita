package org.fpu.clinica.agenda;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.AGENDA_PATH)
public class AgendaService extends GenericService<Agenda, Long> {

	@Autowired
	private AgendaRepository agendaRepository;

	
}
