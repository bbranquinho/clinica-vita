package org.fpu.clinica.paciente;

import org.fpu.clinica.errors.ErrorServiceInterface;
import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.fileupload.FileUploadRepository;
import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.permissao.PermissaoRepository;
import org.fpu.clinica.pessoa.TipoSexo;
import org.fpu.clinica.security.CurrentUser;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.fpu.clinica.usuariopermissao.UsuarioPermissao;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoKey;
import org.fpu.clinica.usuariopermissao.UsuarioPermissaoRepository;
import org.fpu.clinica.utils.ComUtils;
import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;



@RestController
@RequestMapping(path = ServicePath.PACIENTE_PATH)
public class PacienteService extends GenericService<Paciente, Long> {
	@Autowired
	private CurrentUser currentUser;

	@Autowired
	private UsuarioRepository userRepository;
	
	@Autowired
	private PermissaoRepository permissaoRepository;
	
	@Autowired
	private UsuarioPermissaoRepository userPermissionRepository;
	
	@Autowired
	private PacienteRepository pacienteRepository;
	
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
	public List<Paciente> findCurrentUser() {
		Usuario user = this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());
		System.out.println("user:"+user.toString());
		List<Paciente> pacientes = this.pacienteRepository.findByUser(user);
		for (Paciente paciente : pacientes) {
			System.out.println("paciente:"+ paciente.toString()); 
		}
		
		
		return this.pacienteRepository.findByUser(user);
	}
	
	
	@RequestMapping(value = "/findCurrentPaciente", method = RequestMethod.GET)
	 @ResponseBody
	public Paciente findCurrentPacienter() {
		Usuario user = this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());
		System.out.println("user:"+user.toString());
		List<Paciente> pacientes = this.pacienteRepository.findByUser(user);
		for (Paciente paciente: pacientes) {
			return paciente;
		}
		
		
		return null;
	}
	
	@Transactional
	@RequestMapping(value = "/findById/{idPaciente}", method = RequestMethod.GET)
	public ResponseEntity<?> findPacienteById( @PathVariable("idPaciente") Long id) {	
		
		
		Paciente paciente = pacienteRepository.findOne(id);

		message.AddField("mensagem", "Load Medicos success");
		message.setData(paciente);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
	
	
	
	@Override
	public ResponseEntity<?> insert(@RequestBody Paciente paciente, Errors erros) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, erros)) {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}

		if(userRepository.findByEmail(paciente.getUser().getEmail()) != null){
			ComUtils.setMessageErro(message,fieldsErrorDetalhe,"Email","EMAIL",
					"Paciente já existe","error");
			 return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}


		paciente.getUser().setPassword(this.passwordEncoder.encode(paciente.getUser().getPassword()));

		
		Usuario usuario = new Usuario();
		usuario.setEmail(paciente.getUser().getEmail());
		usuario.setFileUpload(paciente.getUser().getFileUpload());
		usuario.setNome(paciente.getUser().getNome());
		usuario.setPassword(paciente.getUser().getPassword());
		
		usuario = this.userRepository.save(usuario);
		
		Permissao permissao = this.permissaoRepository.findByRole("ROLE_PACIENTE");
		
		if(permissao == null){
			Permissao permissao2 = new Permissao();
			 permissao2.setRole("ROLE_PACIENTE");
			
			 permissao = this.permissaoRepository.save(permissao2);
		}
		
		//for (Permissao permissao : paciente.getUser().getPermissoes()) {
			UsuarioPermissaoKey userPermissionKey = new UsuarioPermissaoKey();
			userPermissionKey.setPermissaoId(permissao.getId());
			userPermissionKey.setUsuarioId(usuario.getId());
			
			UsuarioPermissao userPermission = new UsuarioPermissao();
			userPermission.setId(userPermissionKey);
			
			this.userPermissionRepository.save(userPermission);
				
			
		//}
		
		paciente.setUser(usuario);
	
		
		return super.insert(paciente, erros);
	}
	
	
	@Transactional
	@Override
	public ResponseEntity<?> update(@RequestBody @Validated Paciente paciente, Errors errors) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, errors)) {

			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}

		return super.update(preparePaciente(paciente), errors);
	}

	private Paciente preparePaciente(Paciente paciente) {
		//paciente.getUser().setPassword(validateUserRequest(paciente).getPassword());
		paciente.getUser().setPassword(this.passwordEncoder.encode(paciente.getUser().getPassword()));

		Usuario usuario = this.userRepository.saveAndFlush(paciente.getUser());


		paciente.setUser(usuario);

		return paciente;
	}

	private Usuario validateUserRequest(Paciente paciente) {
		Usuario user = this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());

		if (paciente.getUser().getEmail().compareToIgnoreCase(user.getEmail()) != 0) {
			throw new SecurityException();
		}

		return user;
	}


	
	@Override
	public ResponseEntity<?> deletar(@RequestBody Paciente paciente) {
		validateUserRequest(paciente);

		return super.deletar(paciente);
	}

	@RequestMapping(value = "/sexos", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> returnSexos() {
		
		 String [] listTipoSexo = new String[TipoSexo.values().length] ;
		 int i = 0;
		 for (TipoSexo sexo: TipoSexo.values()) {
			 listTipoSexo[i] = sexo.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoSexo);
	}
	
	@RequestMapping(value = "/escolaridades", method = RequestMethod.GET)
	@ResponseBody
	public List<String> returnEscolaridades() {
		
		 String [] listTipoEscolaridade = new String[TipoEscolaridade.values().length] ;
		 int i = 0;
		 for (TipoEscolaridade escolaridade: TipoEscolaridade.values()) {
			 listTipoEscolaridade[i] = escolaridade.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoEscolaridade);
	}
	
	@RequestMapping(value = "/estadoscivis", method = RequestMethod.GET)
	@ResponseBody
	public List<String> returnEstadosCivis() {
		
		 String [] listTipoEstadoCivil = new String[TipoEstadoCivil.values().length] ;
		 int i = 0;
		 for (TipoEstadoCivil estadoCivil: TipoEstadoCivil.values()) {
			 listTipoEstadoCivil[i] = estadoCivil.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoEstadoCivil);
	}
	
	@RequestMapping(value = "/etnias", method = RequestMethod.GET)
	@ResponseBody
	public List<String> returnEtnias() {
		
		 String [] listTipoEtnias = new String[TipoEtnia.values().length] ;
		 int i = 0;
		 for (TipoEtnia etnia: TipoEtnia.values()) {
			 listTipoEtnias[i] = etnia.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoEtnias);
	}
	
	@RequestMapping(value = "/fatoressanguineos", method = RequestMethod.GET)
	@ResponseBody
	public List<String> returnfatoresSanguineos() {
		
		 String [] listTipoFatoresSanguineos = new String[TipoFatorSanguineo.values().length] ;
		 int i = 0;
		 for (TipoFatorSanguineo fatorSanguineo: TipoFatorSanguineo.values()) {
			 listTipoFatoresSanguineos[i] = fatorSanguineo.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoFatoresSanguineos);
	}
	
	 @RequestMapping(value = "/matriculapaciente", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> getMatriculaPaciente() {
		 
		 String[] matricula = new String[1];
			matricula [0]	 = "MGXK-"+System.currentTimeMillis();
		 
		return Arrays.asList(matricula);
	}
	 
	 
	 @Transactional
		@RequestMapping(value = "/findByStatus/{status}", method = RequestMethod.GET)
		public ResponseEntity<?> findAgendaByStatus( @PathVariable("status") String status) {	
			
			
			List<Paciente> pacientes = pacienteRepository.findByStatus(status);

			message.AddField("mensagem", "Load Pacientes success");
			message.setData(pacientes);
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}


	@RequestMapping(value = "/quantidade_pacientes", method = RequestMethod.GET)
	@ResponseBody
	public Long getQuantidadePacientes() {

		Long quantidadePacientes = this.pacienteRepository.findByQuantidadePacientes();



		return quantidadePacientes;
	}

	@RequestMapping(value = "/quantidade_pacientes_sexo/{sexo}", method = RequestMethod.GET)
	@ResponseBody
	public Long getQuantidadePacientesBySexo(@PathVariable("sexo") String sexo) {

		Long quantidadePacientesBySexo = this.pacienteRepository.countBySexo(sexo);



		return quantidadePacientesBySexo;
	}
}
