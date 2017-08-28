package org.fpu.test.clinica.repositories;

import java.util.Date;
import java.util.List;

import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.cargo.CargoRepository;
import org.fpu.clinica.funcionario.Funcionario;
import org.fpu.clinica.funcionario.FuncionarioRepository;
import org.fpu.clinica.funcionario.Funcionario;
import org.fpu.clinica.funcionario.Funcionario;
import org.fpu.clinica.setor.Setor;
import org.fpu.clinica.setor.SetorRepository;
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
public class FuncionarioRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FuncionarioRepositoryTest.class);
	
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
		List<Funcionario> funcionarios= this.funcionarioRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + funcionarios);
		}
	}
	
	@Test
	public void addTest(){
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
		String email = "test@user.com" ;
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
		
		LOGGER.info("Test Add funcionario: "+ funcionario);
		
	}
	
	@Test
	public void updateTest(){
		

		
		Funcionario funcionario = this.funcionarioRepository.findByMatricula("Mxz124123");
		
		if(funcionario != null){	
			funcionario.setBairro("Luizote");
						
			LOGGER.info("Test update funcionario"+this.funcionarioRepository.save(funcionario));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		/*Delete Funcionario*/
		Funcionario funcionario = this.funcionarioRepository.findByMatricula("Mxz124123");
		
		LOGGER.info("funcionario:" + funcionario);
		if(funcionario != null){
			 this.funcionarioRepository.delete(funcionario);
			 LOGGER.info("Teste delete funcionario" + funcionario);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		/*Delete Usuario*/
		Usuario usuario = this.usuarioRepository.findByNome("Usuario Teste");	
		 LOGGER.info("usuario:" + usuario);
		if(usuario != null){
			 this.usuarioRepository.delete(usuario);
			 LOGGER.info("Teste delete usuario" + usuario);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		
		/*Delete Cargo*/
		Cargo cargo = this.cargoRepository.findByNome("Cargo Teste");	
		 LOGGER.info("cargo:" + cargo);
		if(cargo != null){
			 this.cargoRepository.delete(cargo);
			 LOGGER.info("Teste delete cargo" + cargo);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		/*Delete Setor*/
		Setor setor = this.setorRepository.findByNome("Setor Teste");	
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
