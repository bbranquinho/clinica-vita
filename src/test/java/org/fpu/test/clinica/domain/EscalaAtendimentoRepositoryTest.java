package org.fpu.test.clinica.domain;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.escala.EscalaAtendimento;
import org.fpu.clinica.escala.EscalaAtendimentoRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class EscalaAtendimentoRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private EscalaAtendimentoRepository escalaAtendimentoRepository;
	
	@Test
	public void findAllTest() {
		List<EscalaAtendimento> escalasAtendimento= this.escalaAtendimentoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + escalasAtendimento);
		}
		
		LOGGER.debug(escalasAtendimento);

		assertNotNull(escalasAtendimento);
		assertTrue(escalasAtendimento.size() > 0);
	}
	
	

}
