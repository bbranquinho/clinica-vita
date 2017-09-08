package org.fpu.test.clinica.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.cargo.CargoRepository;
import org.fpu.clinica.escala.EscalaAtendimento;
import org.fpu.clinica.escala.EscalaAtendimentoRepository;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.medico.MedicoRepository;
import org.fpu.clinica.setor.Setor;
import org.fpu.clinica.setor.SetorRepository;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class EscalaAtendimentoRepositoryTest extends BaseTest {

	private final Logger LOGGER = Logger.getLogger(this.getClass());

	@Autowired
	private EscalaAtendimentoRepository escalaAtendimentoRepository;

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
		List<EscalaAtendimento> escalasAtendimento = this.escalaAtendimentoRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + escalasAtendimento);
		}

		LOGGER.debug(escalasAtendimento);

		assertNotNull(escalasAtendimento);
		assertTrue(escalasAtendimento.size() > 0);
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

		 medico = this.medicoRepository.findByRegistroProfissional("012154654");
		EscalaAtendimento escalaAtendimento = new EscalaAtendimento();
		escalaAtendimento.setDataModificacao(new Date());
		escalaAtendimento.setMedico(medico);

		escalaAtendimento = this.escalaAtendimentoRepository.save(escalaAtendimento);

		LOGGER.info("Test Add escalaAtendimento: " + escalaAtendimento);

		assertNotNull(escalaAtendimento);
		assertTrue(escalaAtendimento.getId() != null);

	}

}
