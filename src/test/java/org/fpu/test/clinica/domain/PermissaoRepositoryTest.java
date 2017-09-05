package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.permissao.PermissaoRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class PermissaoRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private PermissaoRepository permissaoRepository;
	
	@Test
	public void findAllTest() {
		List<Permissao> permissoes= this.permissaoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + permissoes);
		}
		
		LOGGER.debug(permissoes);

		assertNotNull(permissoes);
		assertTrue(permissoes.size() > 0);
	}
	
	@Test
	public void addTest(){
		String role = "Permissao Teste" ;
		
		
		Permissao permissao = new Permissao();
		permissao.setRole(role);
		
		
		permissao = this.permissaoRepository.save(permissao);
		
		LOGGER.info("Test Add permissao: "+ permissao);
		
		assertNotNull(permissao);
		assertTrue(permissao.getId() != null);
		assertThat(permissao.getRole()).isEqualTo(role);
		
	}
	
	
	@Test
	public void updateTest(){
		Permissao permissaoFind = this.permissaoRepository.findByRole("Permissao Teste");
		
		if (permissaoFind == null) {

			addTest();
			permissaoFind = this.permissaoRepository.findByRole("Permissao Teste");
		}

		/* Test Update */

		assertNotNull(permissaoFind);

		permissaoFind.setRole("Permissao Teste Update");
		LOGGER.info("Test update permissao" + this.permissaoRepository.save(permissaoFind));

		assertNotNull(permissaoFind);
		assertTrue(permissaoFind.getId() != null);
		assertThat(permissaoFind.getRole()).isEqualTo("Permissao Teste Update");
		
	}
	
	@Test
	public void deleteTest(){
		Permissao permissao = this.permissaoRepository.findByRole("Permissao Teste Update");

		if (permissao == null) {
			updateTest();
		}
		permissao = this.permissaoRepository.findByRole("Permissao Teste Update");
		this.permissaoRepository.delete(permissao);
		LOGGER.info("Teste delete permissao :" + this.permissaoRepository.findByRole("Permissao Teste Update"));
		
		
		assertNull(this.permissaoRepository.findByRole("Permissao Teste Update"));
	}

}
