package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.escala.EscalaAtendimento;
import org.fpu.clinica.escala.EscalaAtendimentoRepository;
import org.fpu.test.clinica.utils.AppContextTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppContextTest.class)
public class EscalaAtendimentoRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EscalaAtendimentoRepositoryTest.class);
	
	@Autowired
	private EscalaAtendimentoRepository escalaAtendimentoRepository;
	
	@Test
	public void findAllTest() {
		List<EscalaAtendimento> escalasAtendimento= this.escalaAtendimentoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + escalasAtendimento);
		}
	}

}
