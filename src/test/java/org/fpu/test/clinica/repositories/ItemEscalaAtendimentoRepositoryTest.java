package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.itemescala.ItemEscalaAtendimento;
import org.fpu.clinica.itemescala.ItemEscalaAtendimentoRepository;
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
public class ItemEscalaAtendimentoRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ItemEscalaAtendimentoRepositoryTest.class);
	
	@Autowired
	private ItemEscalaAtendimentoRepository itemEscalaAtendimentoRepository;
	
	@Test
	public void findAllTest() {
		List<ItemEscalaAtendimento> itemEscalasAtendimento= this.itemEscalaAtendimentoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + itemEscalasAtendimento);
		}
	}

}
