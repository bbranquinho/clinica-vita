package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.setor.Setor;
import org.fpu.clinica.setor.SetorRepository;
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
public class SetorRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SetorRepositoryTest.class);
	
	@Autowired
	private SetorRepository setorRepository;
	
	@Test
	public void findAllTest() {
		List<Setor> setores= this.setorRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + setores);
		}
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
		
	}
	
	
	@Test
	public void updateTest(){
		Setor setor = this.setorRepository.findByNome("Setor Teste");
		
		if(setor != null){			
			setor.setNome("Setor Teste Update");			
			LOGGER.info("Test update setor"+this.setorRepository.save(setor));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		Setor setor = this.setorRepository.findByNome("Setor Teste Update");	
		 LOGGER.info("setor:" + setor);
		if(setor != null){
			 this.setorRepository.delete(setor);
			 LOGGER.info("Teste delete setor" + setor);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
	}

}
