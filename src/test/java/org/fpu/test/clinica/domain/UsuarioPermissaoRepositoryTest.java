package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.permissao.PermissaoRepository;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.clinica.usuariopermissao.UsuarioPermissao;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoKey;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioPermissaoRepositoryTest extends BaseTest {
	private final Logger LOGGER = Logger.getLogger(this.getClass());

	@Autowired
	private UsuarioPermissaoRepository usuarioPermissaoRepository;

	@Autowired
	private PermissaoRepository permissaoRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Test
	public void findAllTest() {
		List<UsuarioPermissao> usuariosPermissoes = this.usuarioPermissaoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + usuariosPermissoes);
		}

		LOGGER.debug(usuariosPermissoes);

		assertNotNull(usuariosPermissoes);
		assertTrue(usuariosPermissoes.size() > 0);
	}

	@Test
	public void addTest() {
		/* Add Usuario */
		String nome = "Usuario Teste";
		String email = "user@user.com";
		String password = "123456";

		Usuario usuario = new Usuario();
		usuario.setNome(nome);
		usuario.setEmail(email);
		usuario.setPassword(password);

		
		/*Add Permissao*/
		String role = "Permissao Teste";

		Permissao permissao = new Permissao();
		permissao.setRole(role);

		permissao = this.permissaoRepository.save(permissao);

		LOGGER.info("Test Add permissao: " + permissao);

		assertNotNull(permissao);
		assertTrue(permissao.getId() != null);
		assertThat(permissao.getRole()).isEqualTo(role);

		usuario = this.usuarioRepository.save(usuario);

		// LOGGER.info("Test Add usuario: "+ usuario);
		assertNotNull(usuario);
		assertTrue(usuario.getId() != null);
		assertThat(usuario.getNome()).isEqualTo(nome);
		
		

		/* Add usuarioPermissao */
		UsuarioPermissaoKey usuarioPermissaoKey = new UsuarioPermissaoKey();
		usuarioPermissaoKey.setPermissaoId(permissao.getId());
		usuarioPermissaoKey.setUsuarioId(usuario.getId());

		UsuarioPermissao usuarioPermissao = new UsuarioPermissao();

		usuarioPermissao.setId(usuarioPermissaoKey);

		usuarioPermissao = this.usuarioPermissaoRepository.save(usuarioPermissao);

		LOGGER.info("Test Add usuarioPermissao: " + usuarioPermissao);

		assertNotNull(usuarioPermissao);

	}

	@Test
	public void deleteTest() {
		
		
		
		
		
		Usuario usuario = usuarioRepository.findByNome("Usuario Teste");
		Permissao permissao = permissaoRepository.findByRole("Permissao Teste");
		
		UsuarioPermissaoKey usuarioPermissaoKey = new UsuarioPermissaoKey();
		usuarioPermissaoKey.setPermissaoId(permissao.getId());
		usuarioPermissaoKey.setUsuarioId(usuario.getId());
		
		
		UsuarioPermissao usuarioPermissao = this.usuarioPermissaoRepository.findById(usuarioPermissaoKey);

		if (usuarioPermissao == null) {

			addTest();
			 usuarioPermissao = this.usuarioPermissaoRepository.findById(usuarioPermissaoKey);
		}

		/* Test Update */

		assertNotNull(usuarioPermissao);

		this.usuarioPermissaoRepository.delete(usuarioPermissao);
		LOGGER.info("Teste delete usuarioPermissao :" +  this.usuarioPermissaoRepository.findById(usuarioPermissaoKey));
		assertNull( this.usuarioPermissaoRepository.findById(usuarioPermissaoKey));
		
		this.usuarioRepository.delete(usuario);
		LOGGER.info("Teste delete usuario :" +  this.usuarioRepository.findByNome("Usuario Teste"));
		assertNull( this.usuarioRepository.findByNome("Usuario Teste"));
		
		this.permissaoRepository.delete(permissao);
		LOGGER.info("Teste delete permissao :" +  this.permissaoRepository.findByRole("Permissao Teste"));
		assertNull( this.permissaoRepository.findByRole("Permissao Teste"));
		

	}

	

}
