package org.fpu.test.clinica.domain;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.itemescala.ItemEscalaAtendimento;
import org.fpu.clinica.itemescala.ItemEscalaAtendimentoRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class ItemEscalaAtendimentoRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private ItemEscalaAtendimentoRepository itemEscalaAtendimentoRepository;
	
	@Test
	public void findAllTest() {
		List<ItemEscalaAtendimento> itemEscalasAtendimento= this.itemEscalaAtendimentoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + itemEscalasAtendimento);
		}
		
		LOGGER.debug(itemEscalasAtendimento);

		assertNotNull(itemEscalasAtendimento);
		assertTrue(itemEscalasAtendimento.size() > 0);
	}
	
	

}
