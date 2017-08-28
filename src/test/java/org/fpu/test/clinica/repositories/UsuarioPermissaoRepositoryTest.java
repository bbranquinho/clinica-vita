package org.fpu.test.clinica.repositories;

import java.util.List;

import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.permissao.PermissaoRepository;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.clinica.usuariopermissao.UsuarioPermissao;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoKey;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoRepository;
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
public class UsuarioPermissaoRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UsuarioPermissaoRepositoryTest.class);
	
	@Autowired
	private UsuarioPermissaoRepository usuarioPermissaoRepository;
	
	@Autowired
	private PermissaoRepository permissaoRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Test
	public void findAllTest() {
		List<UsuarioPermissao> usuariosPermissoes= this.usuarioPermissaoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + usuariosPermissoes);
		}
	}
	

	@Test
	public void addTest(){
		/*Add permissao*/
		String role = "Permissao Teste" ;
			
		Permissao permissao = new Permissao();
		permissao.setRole(role);
		
		
		permissao = this.permissaoRepository.save(permissao);
		
		LOGGER.info("Test Add permissao: "+ permissao);
		
		
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
		
		
		
		
		/*Add usuarioPermissao*/
		UsuarioPermissaoKey usuarioPermissaoKey = new UsuarioPermissaoKey();
		usuarioPermissaoKey.setPermissaoId(permissao.getId());
		usuarioPermissaoKey.setUsuarioId(usuario.getId());
		
		
		UsuarioPermissao usuarioPermissao = new UsuarioPermissao();
		
		usuarioPermissao.setId(usuarioPermissaoKey);
			
		usuarioPermissao = this.usuarioPermissaoRepository.save(usuarioPermissao);
		
		LOGGER.info("Test Add usuarioPermissao: "+ usuarioPermissao);
		
	}
	
	
	
	
	@Test
	public void deleteTest(){
		
		Usuario usuario = usuarioRepository.findByNome("Usuario Teste");
		Permissao permissao = permissaoRepository.findByRole("Permissao Teste");
		
		UsuarioPermissaoKey usuarioPermissaoKey = new UsuarioPermissaoKey();
		usuarioPermissaoKey.setPermissaoId(permissao.getId());
		usuarioPermissaoKey.setUsuarioId(usuario.getId());
		
		
		UsuarioPermissao usuarioPermissao = this.usuarioPermissaoRepository.findById(usuarioPermissaoKey);	
		 LOGGER.info("usuarioPermissao:" + usuarioPermissao);
		if(usuarioPermissao != null){
			 this.usuarioPermissaoRepository.delete(usuarioPermissao);
			 LOGGER.info("Teste delete usuarioPermissao" + usuarioPermissao);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		
		
			
		 
		if(usuario != null){
			 this.usuarioRepository.delete(usuario);
			 LOGGER.info("Teste delete usuario" + usuario);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
			
		 
		if(permissao != null){
			 this.permissaoRepository.delete(permissao);
			 LOGGER.info("Teste delete permissao" + permissao);
			 findAllTest();
		}else{
			LOGGER.error("Ocorreu um erro no teste Delete");
		}
		
		
		
	}
	

}
