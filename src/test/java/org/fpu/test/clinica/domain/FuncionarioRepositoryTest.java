package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.cargo.CargoRepository;
import org.fpu.clinica.funcionario.Funcionario;
import org.fpu.clinica.funcionario.FuncionarioRepository;
import org.fpu.clinica.setor.Setor;
import org.fpu.clinica.setor.SetorRepository;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class FuncionarioRepositoryTest extends BaseTest {

	private final Logger LOGGER = Logger.getLogger(this.getClass());

	@Autowired
	private FuncionarioRepository funcionarioRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private CargoRepository cargoRepository;

	@Autowired
	private SetorRepository setorRepository;

	@Test
	public void findAllTest() {
		List<Funcionario> funcionarios = this.funcionarioRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + funcionarios);
		}

		LOGGER.debug(funcionarios);

		assertNotNull(funcionarios);
		assertTrue(funcionarios.size() > 0);
	}

	@Test
	public void addTest() {
		/*Add Cargo*/
		String nomeCargo = "Cargo Teste" ;
		String descricaoCargo = "Cargo Teste Desc" ;	
		
		Cargo cargo = new Cargo();
		cargo.setNome(nomeCargo);
		cargo.setDescricao(descricaoCargo);
		
		cargo = this.cargoRepository.save(cargo);
		
		LOGGER.info("Test Add cargo: "+ cargo);
		
		
		/*Add Setor*/
		String nomeSetor = "Setor Teste" ;
		String descricaoSetor = "Setor Teste Desc" ;	
		
		Setor setor = new Setor();
		setor.setNome(nomeSetor);
		setor.setDescricao(descricaoSetor);
		
		setor = this.setorRepository.save(setor);
		
		LOGGER.info("Test Add setor: "+ setor);
		
		
		/*Add usuario*/
		String nome = "Usuario Teste" ;
		String email = "user@user.com" ;
		String password = "123456";
		
		Usuario usuario = new Usuario();
		usuario.setNome(nome);
		usuario.setEmail(email);
		usuario.setPassword(password);
		
		usuario = this.usuarioRepository.save(usuario);
		
		LOGGER.info("Test Add usuario: "+ usuario);	
		
		/*Add funcionario*/
		Funcionario funcionario = new Funcionario();
		funcionario.setCargo(cargo);
		funcionario.setSetor(setor);
		funcionario.setUser(usuario);
		funcionario.setBairro("Centro");
		funcionario.setCep("3840510");
		funcionario.setCidade("Uberlândia");
		funcionario.setMatricula("Mxz124123");		
		funcionario.setEstado("Minas Gerais");	
	    funcionario.setCpf("01626134665");
	    funcionario.setDataAdmissao(new Date(2000,10,01));
	    funcionario.setDataNascimento(new Date(1987,10,01));
	    funcionario.setEstado("Minas Gerais");        
		funcionario.setNumero("1345");
		funcionario.setRg("1356457");
		funcionario.setRua("Afonso Pena");
		funcionario.setSexo("Masculino");
		funcionario.setStatus("Ativo");
		funcionario.setTelefone("32132132");


		
		funcionario = this.funcionarioRepository.save(funcionario);

		LOGGER.info("Test Add funcionario: " + funcionario);

		assertNotNull(funcionario);
		assertTrue(funcionario.getId() != null);
		assertThat(funcionario.getMatricula()).isEqualTo("Mxz124123");

	}

	@Test
	public void updateTest() {
		Funcionario funcionarioFind = this.funcionarioRepository.findByMatricula("Mxz124123");

		if (funcionarioFind == null) {

			addTest();
			funcionarioFind = this.funcionarioRepository.findByMatricula("Mxz124123");
		}

		/* Test Update */

		assertNotNull(funcionarioFind);

		funcionarioFind.setBairro("Luizote");
		LOGGER.info("Test update funcionario" + this.funcionarioRepository.save(funcionarioFind));

		assertNotNull(funcionarioFind);
		assertTrue(funcionarioFind.getId() != null);
		assertThat(funcionarioFind.getMatricula()).isEqualTo("Mxz124123");

	}

	@Test
	public void deleteTest() {
		Funcionario funcionario = this.funcionarioRepository.findByMatricula("Mxz124123");

		if (funcionario == null) {
			updateTest();
		}
		funcionario = this.funcionarioRepository.findByMatricula("Mxz124123");
		this.funcionarioRepository.delete(funcionario);
		LOGGER.info("Teste delete funcionario :" + this.funcionarioRepository.findByMatricula("Mxz124123"));
		assertNull(this.funcionarioRepository.findByMatricula("Mxz124123"));

		Usuario usuario = this.usuarioRepository.findByNome("Usuario Teste");
		this.usuarioRepository.delete(usuario);
		LOGGER.info("Teste delete usuario :" + this.usuarioRepository.findByNome("Usuario Teste"));
		assertNull(this.usuarioRepository.findByNome("Usuario Teste"));
		
		Cargo cargo = this.cargoRepository.findByNome("Cargo Teste");
		this.cargoRepository.delete(cargo);
		LOGGER.info("Teste delete setor :" + this.cargoRepository.findByNome("Cargo Teste"));
		assertNull(this.cargoRepository.findByNome("Cargo Teste"));
		
		Setor setor = this.setorRepository.findByNome("Setor Teste");
		this.setorRepository.delete(setor);
		LOGGER.info("Teste delete setor :" + this.setorRepository.findByNome("Setor Teste"));
		assertNull(this.setorRepository.findByNome("Setor Teste"));

	}

}
