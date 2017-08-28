package org.fpu.test.clinica.repositories;

import java.util.Date;
import java.util.List;

import org.fpu.clinica.paciente.Paciente;
import org.fpu.clinica.paciente.Paciente;
import org.fpu.clinica.paciente.PacienteRepository;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
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
public class PacienteRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PacienteRepositoryTest.class);
	
	@Autowired
	private PacienteRepository pacienteRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Test
	public void findAllTest() {
		List<Paciente> pacientes= this.pacienteRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + pacientes);
		}
	}
	
	@Test
	public void addTest(){
		String nome = "Usuario Teste" ;
		String email = "teste@user.com" ;
		String password = "123456";
		
		Usuario usuario = new Usuario();
		usuario.setNome(nome);
		usuario.setEmail(email);
		usuario.setPassword(password);
		
		usuario = this.usuarioRepository.save(usuario);
		
		LOGGER.info("Test Add usuario: "+ usuario);	
		
		Paciente paciente = new Paciente();
		paciente.setUser(usuario);
		paciente.setBairro("Centro");
		paciente.setCep("3840510");
		paciente.setCidade("Uberlândia");
		paciente.setCns("13411232");
	    paciente.setCpf("01626134665");
	    paciente.setDataNascimento(new Date(1987,10,01));
	    paciente.setEscolaridade("Ensino Superior");
	    paciente.setEstado("Minas Gerais");
	    paciente.setEstadoCivil("Solteiro");
	    paciente.setEtnia("Branco");
	    paciente.setFatorSanguineo("O+");
	    paciente.setHobbie("Football");
	    paciente.setMatricula("Mxz12341234");
	    paciente.setNomeConjuge("Joao Silva");
		paciente.setNomeMae("Maria Silva");
		paciente.setNomePai("Jose Silva");
		paciente.setNumero("1345");
		paciente.setProfissao("Motorista");
		paciente.setRg("1356457");
		paciente.setRua("Afonso Pena");
		paciente.setSexo("Masculino");
		paciente.setStatus("Ativo");
		paciente.setTelefone("32132132");


		
		paciente = this.pacienteRepository.save(paciente);
		
		LOGGER.info("Test Add paciente: "+ paciente);
		
	}
	
	
	@Test
	public void updateTest(){
		

		
		Paciente paciente = this.pacienteRepository.findByMatricula("Mxz12341234");
		
		if(paciente != null){	
			paciente.setEstadoCivil("Casado");
						
			LOGGER.info("Test update paciente"+this.pacienteRepository.save(paciente));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		
		Paciente paciente = this.pacienteRepository.findByMatricula("Mxz12341234");
		
		LOGGER.info("paciente:" + paciente);
		if(paciente != null){
			 this.pacienteRepository.delete(paciente);
			 LOGGER.info("Teste delete paciente" + paciente);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		Usuario usuario = this.usuarioRepository.findByNome("Usuario Teste");	
		 LOGGER.info("usuario:" + usuario);
		if(usuario != null){
			 this.usuarioRepository.delete(usuario);
			 LOGGER.info("Teste delete usuario" + usuario);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
	}
}
