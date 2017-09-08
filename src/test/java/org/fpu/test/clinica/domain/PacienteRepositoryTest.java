package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.paciente.Paciente;
import org.fpu.clinica.paciente.PacienteRepository;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class PacienteRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
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
		
		LOGGER.debug(pacientes);

		assertNotNull(pacientes);
		assertTrue(pacientes.size() > 0);
	}
	
	@Test
	public void addTest(){
		String nome = "Usuario Teste" ;
		String email = "user@user.com" ;
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
		
		assertNotNull(paciente);
		assertTrue(paciente.getId() != null);
		assertThat(paciente.getMatricula()).isEqualTo("Mxz12341234");
		
	}
	
	
	@Test
	public void updateTest(){
		Paciente pacienteFind = this.pacienteRepository.findByMatricula("Mxz12341234");
		
		if (pacienteFind == null) {

			addTest();
			pacienteFind = this.pacienteRepository.findByMatricula("Mxz12341234");
		}

		/* Test Update */

		assertNotNull(pacienteFind);

		pacienteFind.setEstadoCivil("Casado");
		LOGGER.info("Test update paciente" + this.pacienteRepository.save(pacienteFind));

		assertNotNull(pacienteFind);
		assertTrue(pacienteFind.getId() != null);
		assertThat(pacienteFind.getMatricula()).isEqualTo("Mxz12341234");
		
	}
	
	@Test
	public void deleteTest(){
		Paciente paciente = this.pacienteRepository.findByMatricula("Mxz12341234");

		if (paciente == null) {
			updateTest();
		}
		paciente = this.pacienteRepository.findByMatricula("Mxz12341234");
		this.pacienteRepository.delete(paciente);
		LOGGER.info("Teste delete paciente :" + this.pacienteRepository.findByMatricula("Mxz12341234"));
		assertNull(this.pacienteRepository.findByMatricula("Mxz12341234"));
		
		Usuario usuario = this.usuarioRepository.findByNome("Usuario Teste");
		this.usuarioRepository.delete(usuario);
		LOGGER.info("Teste delete usuario :" + this.usuarioRepository.findByNome("Usuario Teste"));
		assertNull(this.usuarioRepository.findByNome("Usuario Teste"));
		
	}

}
