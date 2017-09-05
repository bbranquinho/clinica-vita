package org.fpu.test.clinica.domain;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.agenda.Agenda;
import org.fpu.clinica.agenda.AgendaRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class AgendaRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private AgendaRepository agendaRepository;
	
	@Test
	public void findAllTest() {
		List<Agenda> agendas= this.agendaRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + agendas);
		}
		
		LOGGER.debug(agendas);

		assertNotNull(agendas);
		assertTrue(agendas.size() > 0);
	}
	
	

}
