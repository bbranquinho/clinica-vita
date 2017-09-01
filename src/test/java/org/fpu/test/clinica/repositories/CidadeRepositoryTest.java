package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.cidade.Cidade;
import org.fpu.clinica.cidade.CidadeRepository;
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
public class CidadeRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CidadeRepositoryTest.class);
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Test
	public void findAllTest() {
		List<Cidade> cidades= this.cidadeRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + cidades);
		}
	}
	
	
	
	@Test
	public void addTest(){
		
		/*ADD estado test*/
		String nomeEstado = "Estado Teste" ;
		String sigla = "TE" ;	
		
		Estado estado = new Estado();
		estado.setNome(nomeEstado);
		estado.setSigla(sigla);
		
		estado = this.estadoRepository.save(estado);
		
		LOGGER.info("Test Add estado: "+ estado);
		
		
		/*ADD Cidade*/
		
		String nome = "Cidade Teste" ;
			
		
		Cidade cidade = new Cidade();
		cidade.setNome(nome);
		cidade.setEstado(estado);
		
		cidade = this.cidadeRepository.save(cidade);
		
		LOGGER.info("Test Add cidade: "+ cidade);
		
	}
	
	
	@Test
	public void updateTest(){
		Cidade cidade = this.cidadeRepository.findByNome("Cidade Teste");
		
		if(cidade != null){			
			cidade.setNome("Cidade Teste Update");			
			LOGGER.info("Test update cidade"+this.cidadeRepository.save(cidade));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		/*delete Cidade*/
		Cidade cidade = this.cidadeRepository.findByNome("Cidade Teste Update");	
		 LOGGER.info("cidade:" + cidade);
		if(cidade != null){
			 this.cidadeRepository.delete(cidade);
			 LOGGER.info("Teste delete cidade" + cidade);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		/*delete Estado*/
		Estado estado = this.estadoRepository.findByNome("Estado Teste");	
		 
		if(estado != null){
			 this.estadoRepository.delete(estado);
			 LOGGER.info("Teste delete estado" + estado);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
	}
	

}
