package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.cargo.CargoRepository;
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
public class CargoRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CargoRepositoryTest.class);
	
	@Autowired
	private CargoRepository cargoRepository;
	
	@Test
	public void findAllTest() {
		List<Cargo> cargos= this.cargoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + cargos);
		}
	}
	
	@Test
	public void addTest(){
		String nome = "Cargo Teste" ;
		String descricao = "Cargo Teste Desc" ;	
		
		Cargo cargo = new Cargo();
		cargo.setNome(nome);
		cargo.setDescricao(descricao);
		
		cargo = this.cargoRepository.save(cargo);
		
		LOGGER.info("Test Add cargo: "+ cargo);
		
	}
	
	
	@Test
	public void updateTest(){
		Cargo cargo = this.cargoRepository.findByNome("Cargo Teste");
		
		if(cargo != null){			
			cargo.setNome("Cargo Teste Update");			
			LOGGER.info("Test update cargo"+this.cargoRepository.save(cargo));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		Cargo cargo = this.cargoRepository.findByNome("Cargo Teste Update");	
		 LOGGER.info("cargo:" + cargo);
		if(cargo != null){
			 this.cargoRepository.delete(cargo);
			 LOGGER.info("Teste delete cargo" + cargo);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
	}

}
