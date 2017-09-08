package org.fpu.clinica.medico;

import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.fpu.clinica.errors.ErrorServiceInterface;
import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.fileupload.FileUploadRepository;
import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.permissao.PermissaoRepository;
import org.fpu.clinica.pessoa.TipoCidade;
import org.fpu.clinica.pessoa.TipoEstado;
import org.fpu.clinica.pessoa.TipoSexo;
import org.fpu.clinica.security.CurrentUser;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.clinica.usuariopermissao.UsuarioPermissao;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoKey;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoRepository;
import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.MEDICO_PATH)
public class MedicoService extends GenericService<Medico, Long> {
	@Autowired
	private CurrentUser currentUser;

	@Autowired
	private UsuarioRepository userRepository;

	@Autowired
	private PermissaoRepository permissaoRepository;

	@Autowired
	private UsuarioPermissaoRepository userPermissionRepository;

	@Autowired
	private MedicoRepository medicoRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	public ErrorServiceInterface errorServiceInterface;

	@Autowired
	public FileUploadRepository fileUploadRepository;

	FieldsErrorDetalhe fieldsErrorDetalhe = new FieldsErrorDetalhe();
	Message message = new Message();

	@RequestMapping(value = "/findCurrentUser", method = RequestMethod.GET)
	@ResponseBody
	public List<Medico> findCurrentUser() {
		Usuario user = this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());
		System.out.println("user:" + user.toString());
		List<Medico> medicos = this.medicoRepository.findByUser(user);
		for (Medico medico : medicos) {
			System.out.println("medico:" + medico.toString());
		}

		return this.medicoRepository.findByUser(user);
	}

	@Override
	public ResponseEntity<?> insert(@RequestBody @Validated Medico medico, Errors erros) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, erros)) {

			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}

		medico.getUser().setPassword(this.passwordEncoder.encode(medico.getUser().getPassword()));

		Usuario usuario = new Usuario();
		usuario.setEmail(medico.getUser().getEmail());
		usuario.setFileUpload(medico.getUser().getFileUpload());
		usuario.setNome(medico.getUser().getNome());
		usuario.setPassword(medico.getUser().getPassword());

		usuario = this.userRepository.saveAndFlush(usuario);

		Permissao permissao = this.permissaoRepository.findByRole("ROLE_MEDICO");

		if (permissao == null) {
			Permissao permissao2 = new Permissao();
			permissao2.setRole("ROLE_MEDICO");

			permissao = this.permissaoRepository.save(permissao2);
		}

		// for (Permissao permissao : funcionario.getUser().getPermissoes()) {
		UsuarioPermissaoKey userPermissionKey = new UsuarioPermissaoKey();
		userPermissionKey.setPermissaoId(permissao.getId());
		userPermissionKey.setUsuarioId(usuario.getId());

		UsuarioPermissao userPermission = new UsuarioPermissao();
		userPermission.setId(userPermissionKey);

		this.userPermissionRepository.save(userPermission);

		// }

		medico.setUser(usuario);

		return super.insert(medico, erros);
	}

	@Transactional
	@Override
	public ResponseEntity<?> update(@RequestBody @Validated Medico medico, Errors errors) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, errors)) {

			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}
		validateUserRequest(medico);
		// medico.getUser().setPassword(this.passwordEncoder.encode(medico.getUser().getPassword()));

		medico.getUser().setPassword(validateUserRequest(medico).getPassword());
		/*
		 * System.out.println("File:"+
		 * medico.getUser().getFileUpload().getId()); Long idFile =
		 * medico.getUser().getFileUpload().getId();
		 * System.out.println("idFile:"+ idFile); FileUpload fileUplad = new
		 * FileUpload(); fileUplad.setId(idFile);
		 * fileUplad.setFile(medico.getUser().getFileUpload().getFile());
		 * fileUplad.setMimeType(medico.getUser().getFileUpload().getMimeType())
		 * ; fileUplad = this.fileUploadRepository.saveAndFlush(fileUplad);
		 */

		/*
		 * Usuario usuario = new Usuario(); //usuario =
		 * this.userRepository.findByEmail(currentUser.getActiveUser().getEmail(
		 * )); usuario.setEmail(medico.getUser().getEmail());
		 * 
		 * usuario.setFileUpload(fileUplad);
		 * usuario.setNome(medico.getUser().getNome());
		 * usuario.setPassword(medico.getUser().getPassword());
		 */

		Usuario usuario = this.userRepository.saveAndFlush(medico.getUser());

		medico.setUser(usuario);
		return super.update(medico, errors);
	}

	private Usuario validateUserRequest(Medico medico) {
		// Usuario user =
		// this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());
		Usuario user = this.userRepository.findByEmail(medico.getUser().getEmail());
		if (medico.getUser().getEmail().compareToIgnoreCase(user.getEmail()) != 0) {
			throw new SecurityException();
		}

		return user;
	}

	@Override
	public ResponseEntity<?> deletar(@RequestBody Medico medico) {
		validateUserRequest(medico);

		return super.deletar(medico);
	}

	@RequestMapping(value = "/sexos", method = RequestMethod.GET)
	@ResponseBody
	public List<String> returnSexos() {

		String[] listTipoSexo = new String[TipoSexo.values().length];
		int i = 0;
		for (TipoSexo sexo : TipoSexo.values()) {
			listTipoSexo[i] = sexo.getDescricao();
			i++;
		}

		return Arrays.asList(listTipoSexo);
	}

	@RequestMapping(value = "/cidades", method = RequestMethod.GET)
	@ResponseBody
	public List<TipoCidade> returnCidades() {

		return Arrays.asList(TipoCidade.values());
	}

	@RequestMapping(value = "/estados", method = RequestMethod.GET)
	@ResponseBody
	public List<String> returnEstados() {

		String[] listTipoEstado = new String[TipoEstado.values().length];
		int i = 0;
		for (TipoEstado estado : TipoEstado.values()) {
			listTipoEstado[i] = estado.getDescricao();
			i++;
		}

		return Arrays.asList(listTipoEstado);
	}

	@RequestMapping(value = "/registrosprofissionais", method = RequestMethod.GET)
	@ResponseBody
	public List<String> returnTipoRegistroProfissional() {

		String[] listTipoRegistroProfissional = new String[TipoRegistroProfissional.values().length];
		int i = 0;
		for (TipoRegistroProfissional registroProfissional : TipoRegistroProfissional.values()) {
			listTipoRegistroProfissional[i] = registroProfissional.getDescricao();
			i++;
		}

		return Arrays.asList(listTipoRegistroProfissional);
	}

	@Transactional
	@RequestMapping(value = "/findByStatus/{status}", method = RequestMethod.GET)
	public ResponseEntity<?> findAgendaByStatus(@PathVariable("status") String status) {

		List<Medico> medicos = medicoRepository.findByStatus(status);

		message.AddField("mensagem", "Load Medicos success");
		message.setData(medicos);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
}
