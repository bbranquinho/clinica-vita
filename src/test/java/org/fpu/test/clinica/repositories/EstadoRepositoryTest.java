package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.estado.Estado;
import org.fpu.clinica.estado.EstadoRepository;
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
public class EstadoRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EstadoRepositoryTest.class);
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Test
	public void findAllTest() {
		List<Estado> estados= this.estadoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + estados);
		}
	}
	
	@Test
	public void addTest(){
		String nome = "Estado Teste" ;
		String sigla = "TE" ;	
		
		Estado estado = new Estado();
		estado.setNome(nome);
		estado.setSigla(sigla);
		
		estado = this.estadoRepository.save(estado);
		
		LOGGER.info("Test Add estado: "+ estado);
		
	}
	
	
	@Test
	public void updateTest(){
		Estado estado = this.estadoRepository.findByNome("Estado Teste");
		
		if(estado != null){			
			estado.setNome("Estado Teste Update");			
			LOGGER.info("Test update estado"+this.estadoRepository.save(estado));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		Estado estado = this.estadoRepository.findByNome("Estado Teste Update");	
		 LOGGER.info("estado:" + estado);
		if(estado != null){
			 this.estadoRepository.delete(estado);
			 LOGGER.info("Teste delete estado" + estado);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
	}

}
