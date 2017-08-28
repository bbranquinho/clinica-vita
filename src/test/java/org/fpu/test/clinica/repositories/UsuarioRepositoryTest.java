package org.fpu.test.clinica.repositories;

import java.util.List;

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
public class UsuarioRepositoryTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UsuarioRepositoryTest.class);
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Test
	public void findAllTest() {
		List<Usuario> usuarios= this.usuarioRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + usuarios);
		}
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
		
	}
	
	@Test
	public void updateTest(){
		Usuario usuario = this.usuarioRepository.findByNome("Usuario Teste");
		
		if(usuario != null){			
			usuario.setNome("Usuario Teste Update");			
			LOGGER.info("Test update usuario"+this.usuarioRepository.save(usuario));	
			
		}else{
			LOGGER.error("Ocorreu um erro no teste Update");			
		}
		
	}
	
	@Test
	public void deleteTest(){
		Usuario usuario = this.usuarioRepository.findByNome("Usuario Teste Update");	
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
