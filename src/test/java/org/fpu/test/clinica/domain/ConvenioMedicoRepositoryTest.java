package org.fpu.test.clinica.domain;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.conveniomedico.ConvenioMedico;
import org.fpu.clinica.conveniomedico.ConvenioMedicoRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class ConvenioMedicoRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private ConvenioMedicoRepository convenioMedicoRepository;
	
	@Test
	public void findAllTest() {
		List<ConvenioMedico> convenioMedicos= this.convenioMedicoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + convenioMedicos);
		}
		
		LOGGER.debug(convenioMedicos);

		assertNotNull(convenioMedicos);
		assertTrue(convenioMedicos.size() > 0);
	}
	
	

}
