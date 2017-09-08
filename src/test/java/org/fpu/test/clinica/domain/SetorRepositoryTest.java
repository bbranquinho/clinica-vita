package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.setor.Setor;
import org.fpu.clinica.setor.SetorRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class SetorRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private SetorRepository setorRepository;
	
	@Test
	public void findAllTest() {
		List<Setor> setores= this.setorRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + setores);
		}
		
		LOGGER.debug(setores);

		assertNotNull(setores);
		assertTrue(setores.size() > 0);
	}
	
	@Test
	public void addTest(){
		String nome = "Setor Teste" ;
		String descricao = "Setor Teste Desc" ;	
		
		Setor setor = new Setor();
		setor.setNome(nome);
		setor.setDescricao(descricao);
		
		
		setor = this.setorRepository.save(setor);
		
		LOGGER.info("Test Add setor: "+ setor);
		
		assertNotNull(setor);
		assertTrue(setor.getId() != null);
		assertThat(setor.getNome()).isEqualTo(nome);
		
	}
	
	
	@Test
	public void updateTest(){
		Setor setorFind = this.setorRepository.findByNome("Setor Teste");
		
		if (setorFind == null) {

			addTest();
			setorFind = this.setorRepository.findByNome("Setor Teste");
		}

		/* Test Update */

		assertNotNull(setorFind);

		setorFind.setNome("Setor Teste Update");
		LOGGER.info("Test update setor" + this.setorRepository.save(setorFind));

		assertNotNull(setorFind);
		assertTrue(setorFind.getId() != null);
		assertThat(setorFind.getNome()).isEqualTo("Setor Teste Update");
		
	}
	
	@Test
	public void deleteTest(){
		Setor setor = this.setorRepository.findByNome("Setor Teste Update");

		if (setor == null) {
			updateTest();
		}
		setor = this.setorRepository.findByNome("Setor Teste Update");
		this.setorRepository.delete(setor);
		LOGGER.info("Teste delete setor :" + this.setorRepository.findByNome("Setor Teste Update"));
		
		
		assertNull(this.setorRepository.findByNome("Setor Teste Update"));
	}

}
