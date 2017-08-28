package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.permissao.PermissaoRepository;
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
public class PermissaoRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PermissaoRepositoryTest.class);
	
	@Autowired
	private PermissaoRepository permissaoRepository;
	
	@Test
	public void findAllTest() {
		List<Permissao> permissoes= this.permissaoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + permissoes);
		}
	}
	
	@Test
	public void addTest(){
		String role = "Permissao Teste" ;
		
		
		Permissao permissao = new Permissao();
		permissao.setRole(role);
		
		
		permissao = this.permissaoRepository.save(permissao);
		
		LOGGER.info("Test Add permissao: "+ permissao);
		
	}
	
	
	@Test
	public void updateTest(){
		Permissao permissao = this.permissaoRepository.findByRole("Permissao Teste");
		
		if(permissao != null){			
			permissao.setRole("Permissao Teste Update");			
			LOGGER.info("Test update permissao"+this.permissaoRepository.save(permissao));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		Permissao permissao = this.permissaoRepository.findByRole("Permissao Teste Update");	
		 LOGGER.info("permissao:" + permissao);
		if(permissao != null){
			 this.permissaoRepository.delete(permissao);
			 LOGGER.info("Teste delete permissao" + permissao);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
	}

}
