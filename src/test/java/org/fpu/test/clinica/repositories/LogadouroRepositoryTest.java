package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.bairro.Bairro;
import org.fpu.clinica.bairro.BairroRepository;
import org.fpu.clinica.logradouro.Logradouro;
import org.fpu.clinica.logradouro.Logradouro;
import org.fpu.clinica.cidade.Cidade;
import org.fpu.clinica.cidade.CidadeRepository;
import org.fpu.clinica.estado.Estado;
import org.fpu.clinica.estado.EstadoRepository;
import org.fpu.clinica.logradouro.Logradouro;
import org.fpu.clinica.logradouro.LogradouroRepository;
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
public class LogadouroRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LogadouroRepositoryTest.class);
	
	@Autowired
	private LogradouroRepository logradouroRepository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private BairroRepository bairroRepository;
	
	@Test
	public void findAllTest() {
		List<Logradouro> logradouros= this.logradouroRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + logradouros);
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
		
			
		/*ADD Cidade*/		
		String nomeCidade = "Cidade Teste" ;
			
		
		Cidade cidade = new Cidade();
		cidade.setNome(nomeCidade);
		cidade.setEstado(estado);
		
		cidade = this.cidadeRepository.save(cidade);
	
		
		/*ADD Bairro*/		
		String nomeBairro = "Bairro Teste" ;
					
		Bairro bairro = new Bairro();
		bairro.setNome(nomeBairro);
		bairro.setCidade(cidade);
		
		
		bairro = this.bairroRepository.save(bairro);
		
		LOGGER.info("Test Add bairro: "+ bairro);
		
		
		
		/*ADD Logradouro*/
		String nome = "Logradouro Teste" ;
		String cep = "Cep Teste" ;	
		
		Logradouro logradouro = new Logradouro();
		logradouro.setNome(nome);
		logradouro.setCep(cep);
		
		logradouro = this.logradouroRepository.save(logradouro);
		
		LOGGER.info("Test Add logradouro: "+ logradouro);
		
	}
	
	
	@Test
	public void updateTest(){
		Logradouro logradouro = this.logradouroRepository.findByNome("Logradouro Teste");
		
		if(logradouro != null){			
			logradouro.setNome("Logradouro Teste Update");			
			LOGGER.info("Test update logradouro"+this.logradouroRepository.save(logradouro));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	
	@Test
	public void deleteTest(){
		/*delete logradouro*/
		Logradouro logradouro = this.logradouroRepository.findByNome("Logradouro Teste Update");	
		 LOGGER.info("logradouro:" + logradouro);
		if(logradouro != null){
			 this.logradouroRepository.delete(logradouro);
			 LOGGER.info("Teste delete logradouro" + logradouro);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		
		
		/*delete Bairro*/
		Bairro bairro = this.bairroRepository.findByNome("Bairro Teste");	
		 LOGGER.info("bairro:" + bairro);
		if(bairro != null){
			 this.bairroRepository.delete(bairro);
			 LOGGER.info("Teste delete bairro" + bairro);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		
		/*delete Cidade*/
		Cidade cidade = this.cidadeRepository.findByNome("Cidade Teste");	
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
