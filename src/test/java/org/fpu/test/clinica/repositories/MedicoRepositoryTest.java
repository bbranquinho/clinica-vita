package org.fpu.test.clinica.repositories;

import java.util.Date;
import java.util.List;

import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.cargo.CargoRepository;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.medico.MedicoRepository;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.medico.Medico;
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
public class MedicoRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MedicoRepositoryTest.class);
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private MedicoRepository medicoRepository;
	
	@Autowired
	private CargoRepository cargoRepository;
	
	@Autowired
	private SetorRepository setorRepository;
	
	
	@Test
	public void findAllTest() {
		List<Medico> medicos= this.medicoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + medicos);
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
		
		/*Add medico*/
		Medico medico = new Medico();
		medico.setCargo(cargo);
		medico.setSetor(setor);
		medico.setUser(usuario);
		medico.setBairro("Centro");
		medico.setCep("3840510");
		medico.setCidade("Uberlândia");
		medico.setRegistroProfissional("012154654");
		medico.setTipoRegistro("CRM");
		medico.setEstado("Minas Gerais");
		medico.setEspecialidade("Medico");
	    medico.setCpf("01626134665");
	    medico.setDataAdmissao(new Date(2000,10,01));
	    medico.setDataNascimento(new Date(1987,10,01));
	    medico.setEstado("Minas Gerais");    
	    medico.setEstadoRegistro("Minas Gerais");
		medico.setNumero("1345");
		medico.setRg("1356457");
		medico.setRua("Afonso Pena");
		medico.setSexo("Masculino");
		medico.setStatus("Ativo");
		medico.setTelefone("32132132");


		
		medico = this.medicoRepository.save(medico);
		
		LOGGER.info("Test Add medico: "+ medico);
		
	}
	
	
	@Test
	public void updateTest(){
		

		
		Medico medico = this.medicoRepository.findByRegistroProfissional("012154654");
		
		if(medico != null){	
			medico.setTipoRegistro("CRAS");
						
			LOGGER.info("Test update medico"+this.medicoRepository.save(medico));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		/*Delete Medico*/
		Medico medico = this.medicoRepository.findByRegistroProfissional("012154654");
		
		LOGGER.info("medico:" + medico);
		if(medico != null){
			 this.medicoRepository.delete(medico);
			 LOGGER.info("Teste delete medico" + medico);
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
