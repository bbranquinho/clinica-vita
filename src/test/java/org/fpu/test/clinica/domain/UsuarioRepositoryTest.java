package org.fpu.test.clinica.domain;

import static org.junit.Assert.assertNotNull;
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
	public void findAll_success() {
		List<Usuario> usuarios = usuarioRepository.findAll();

		LOGGER.debug(usuarios);

		assertNotNull(usuarios);
		assertTrue(usuarios.size() > 0);
	}

}
