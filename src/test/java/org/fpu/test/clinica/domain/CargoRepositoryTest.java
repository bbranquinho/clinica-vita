package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.cargo.CargoRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class CargoRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private CargoRepository cargoRepository;
	
	@Test
	public void findAllTest() {
		List<Cargo> cargos= this.cargoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + cargos);
		}
		
		LOGGER.debug(cargos);

		assertNotNull(cargos);
		assertTrue(cargos.size() > 0);
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
		
		assertNotNull(cargo);
		assertTrue(cargo.getId() != null);
		assertThat(cargo.getNome()).isEqualTo(nome);
		
	}
	
	
	@Test
	public void updateTest(){
		Cargo cargoFind = this.cargoRepository.findByNome("Cargo Teste");
		
		if (cargoFind == null) {

			addTest();
			cargoFind = this.cargoRepository.findByNome("Cargo Teste");
		}

		/* Test Update */

		assertNotNull(cargoFind);

		cargoFind.setNome("Cargo Teste Update");
		LOGGER.info("Test update cargo" + this.cargoRepository.save(cargoFind));

		assertNotNull(cargoFind);
		assertTrue(cargoFind.getId() != null);
		assertThat(cargoFind.getNome()).isEqualTo("Cargo Teste Update");
		
	}
	
	@Test
	public void deleteTest(){
		Cargo cargo = this.cargoRepository.findByNome("Cargo Teste Update");

		if (cargo == null) {
			updateTest();
		}
		cargo = this.cargoRepository.findByNome("Cargo Teste Update");
		this.cargoRepository.delete(cargo);
		LOGGER.info("Teste delete cargo :" + this.cargoRepository.findByNome("Cargo Teste Update"));
		
		
		assertNull(this.cargoRepository.findByNome("Cargo Teste Update"));
	}

}
