package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioRepositoryTest extends BaseTest {
	private final Logger LOGGER = Logger.getLogger(this.getClass());

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Test
	public void findAllTest() {
		List<Usuario> usuarios = usuarioRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + usuarios);
		}

		LOGGER.debug(usuarios);

		assertNotNull(usuarios);
		assertTrue(usuarios.size() > 0);
	}

	@Test
	public void addTest() {
		String nome = "Usuario Teste";
		String email = "user@user.com";
		String password = "123456";

		Usuario usuario = new Usuario();
		usuario.setNome(nome);
		usuario.setEmail(email);
		usuario.setPassword(password);

		usuario = this.usuarioRepository.save(usuario);

		// LOGGER.info("Test Add usuario: "+ usuario);
		assertNotNull(usuario);
		assertTrue(usuario.getId() != null);
		assertThat(usuario.getNome()).isEqualTo(nome);

	}

	@Test
	public void updateTest() {
		Usuario usuarioFind = this.usuarioRepository.findByNome("Usuario Teste");

		if (usuarioFind == null) {

			addTest();
			usuarioFind = this.usuarioRepository.findByNome("Usuario Teste");
		}

		/* Test Update */

		assertNotNull(usuarioFind);

		usuarioFind.setNome("Usuario Teste Update");
		LOGGER.info("Test update usuario" + this.usuarioRepository.save(usuarioFind));

		assertNotNull(usuarioFind);
		assertTrue(usuarioFind.getId() != null);
		assertThat(usuarioFind.getNome()).isEqualTo("Usuario Teste Update");

	}

	@Test
	public void deleteTest() {
		Usuario usuario = this.usuarioRepository.findByNome("Usuario Teste Update");

		if (usuario == null) {
			updateTest();
		}
		usuario = this.usuarioRepository.findByNome("Usuario Teste Update");
		this.usuarioRepository.delete(usuario);
		LOGGER.info("Teste delete usuario :" + this.usuarioRepository.findByNome("Usuario Teste Update"));
		
		
		assertNull(this.usuarioRepository.findByNome("Usuario Teste Update"));

	}

}
