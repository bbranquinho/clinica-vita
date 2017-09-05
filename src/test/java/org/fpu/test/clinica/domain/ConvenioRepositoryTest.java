package org.fpu.test.clinica.domain;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.convenio.Convenio;
import org.fpu.clinica.convenio.ConvenioRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class ConvenioRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private ConvenioRepository convenioRepository;
	
	@Test
	public void findAllTest() {
		List<Convenio> convenios= this.convenioRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + convenios);
		}
		
		LOGGER.debug(convenios);

		assertNotNull(convenios);
		assertTrue(convenios.size() > 0);
	}
	
	

}
