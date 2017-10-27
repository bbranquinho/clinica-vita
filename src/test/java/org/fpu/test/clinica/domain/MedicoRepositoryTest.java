package org.fpu.test.clinica.domain;

import org.apache.log4j.Logger;
import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.cargo.CargoRepository;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.medico.MedicoRepository;
import org.fpu.clinica.setor.Setor;
import org.fpu.clinica.setor.SetorRepository;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;

public class MedicoRepositoryTest extends BaseTest {

	private final Logger LOGGER = Logger.getLogger(this.getClass());

	@Autowired
	private MedicoRepository medicoRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private CargoRepository cargoRepository;

	@Autowired
	private SetorRepository setorRepository;

	@Test
	public void findAllTest() {
		List<Medico> medicos = this.medicoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + medicos);
		}

		LOGGER.debug(medicos);

		assertNotNull(medicos);
		assertTrue(medicos.size() > 0);
	}

	@Test
	public void addTest() {
		/* Add Cargo */
		String nomeCargo = "Cargo Teste";
		String descricaoCargo = "Cargo Teste Desc";

		Cargo cargo = new Cargo();
		cargo.setNome(nomeCargo);
		cargo.setDescricao(descricaoCargo);

		cargo = this.cargoRepository.save(cargo);

		LOGGER.info("Test Add cargo: " + cargo);

		/* Add Setor */
		String nomeSetor = "Setor Teste";
		String descricaoSetor = "Setor Teste Desc";

		Setor setor = new Setor();
		setor.setNome(nomeSetor);
		setor.setDescricao(descricaoSetor);

		setor = this.setorRepository.save(setor);

		LOGGER.info("Test Add setor: " + setor);

		/* Add usuario */
		String nome = "Usuario Teste";
		String email = "user@user.com";
		String password = "123456";

		Usuario usuario = new Usuario();
		usuario.setNome(nome);
		usuario.setEmail(email);
		usuario.setPassword(password);

		usuario = this.usuarioRepository.save(usuario);

		LOGGER.info("Test Add usuario: " + usuario);

		/* Add medico */
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
		medico.setDataAdmissao(new Date(2000, 10, 01));
		medico.setDataNascimento(new Date(1987, 10, 01));
		medico.setEstado("Minas Gerais");
		medico.setEstadoRegistro("Minas Gerais");
		medico.setNumero("1345");
		medico.setRg("1356457");
		medico.setRua("Afonso Pena");
		medico.setSexo("Masculino");
		medico.setStatus("Ativo");
		medico.setTelefone("32132132");

		medico = this.medicoRepository.save(medico);

		LOGGER.info("Test Add medico: " + medico);

		assertNotNull(medico);
		assertTrue(medico.getId() != null);
		assertThat(medico.getRegistroProfissional()).isEqualTo("012154654");

	}

	@Test
	public void updateTest() {
		Medico medicoFind = this.medicoRepository.findByRegistroProfissional("012154654");

		if (medicoFind == null) {

			addTest();
			medicoFind = this.medicoRepository.findByRegistroProfissional("012154654");
		}

		/* Test Update */

		assertNotNull(medicoFind);

		medicoFind.setTipoRegistro("CRAS");
		LOGGER.info("Test update medico" + this.medicoRepository.save(medicoFind));

		assertNotNull(medicoFind);
		assertTrue(medicoFind.getId() != null);
		assertThat(medicoFind.getRegistroProfissional()).isEqualTo("012154654");

	}

	@Test
	public void deleteTest() {
		Medico medico = this.medicoRepository.findByRegistroProfissional("012154654");

		if (medico == null) {
			updateTest();
		}
		medico = this.medicoRepository.findByRegistroProfissional("012154654");
		this.medicoRepository.delete(medico);
		LOGGER.info("Teste delete medico :" + this.medicoRepository.findByRegistroProfissional("012154654"));
		assertNull(this.medicoRepository.findByRegistroProfissional("012154654"));

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

	@Test
	public void getQuantidadeMedico(){
		Long quantidadeMedicos = this.medicoRepository.findByQuantidadeMedicos();

		LOGGER.info("Teste quantidade medicos :" +quantidadeMedicos);
		assertTrue(quantidadeMedicos >= 0);

	}


}
