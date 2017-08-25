package org.fpu.clinica.funcionario;

import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.fpu.clinica.errors.ErrorServiceInterface;
import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.fileupload.FileUploadRepository;
import org.fpu.clinica.medico.TipoRegistroProfissional;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping(path = ServicePath.FUNCIONARIO_PATH)
public class FuncionarioService extends GenericService<Funcionario, Long> {
	@Autowired
	private CurrentUser currentUser;

	@Autowired
	private UsuarioRepository userRepository;
	
	@Autowired
	private PermissaoRepository permissaoRepository;
	
	@Autowired
	private UsuarioPermissaoRepository userPermissionRepository;
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
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
	public List<Funcionario> findCurrentUser() {
		Usuario user = this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());
		System.out.println("user:"+user.toString());
		List<Funcionario> funcionarios = this.funcionarioRepository.findByUser(user);
		for (Funcionario funcionario: funcionarios) {
			System.out.println("funcionario:"+ funcionario.toString()); 
		}
		
		
		return this.funcionarioRepository.findByUser(user);
	}
	
	
	
	@Override
	public ResponseEntity<?> insert(@RequestBody  @Validated Funcionario funcionario, Errors erros) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, erros)) {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}

		funcionario.getUser().setPassword(this.passwordEncoder.encode(funcionario.getUser().getPassword()));

		
		Usuario usuario = new Usuario();
		usuario.setEmail(funcionario.getUser().getEmail());
		usuario.setFileUpload(funcionario.getUser().getFileUpload());
		usuario.setNome(funcionario.getUser().getNome());
		usuario.setPassword(funcionario.getUser().getPassword());
		
		usuario = this.userRepository.saveAndFlush(usuario);
		
		/*Permissao permissao = this.permissaoRepository.findByRole("ROLE_FUNCIONARIO");
		
		if(permissao == null){
			Permissao permissao2 = new Permissao();
			 permissao2.setRole("ROLE_FUNCIONARIO");
			
			 permissao = this.permissaoRepository.save(permissao2);
		}*/
		
		for (Permissao permissao : funcionario.getUser().getPermissoes()) {
			UsuarioPermissaoKey userPermissionKey = new UsuarioPermissaoKey();
			userPermissionKey.setPermissaoId(permissao.getId());
			userPermissionKey.setUsuarioId(usuario.getId());
			
			UsuarioPermissao userPermission = new UsuarioPermissao();
			userPermission.setId(userPermissionKey);
			
			this.userPermissionRepository.save(userPermission);
				
			
		}
		
		funcionario.setUser(usuario);
	
		
		return super.insert(funcionario, erros);
	}
	
	
	@Transactional
	@Override
	public ResponseEntity<?> update(@RequestBody @Validated Funcionario funcionario, Errors errors) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, errors)) {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}
		validateUserRequest(funcionario);		
		//funcionario.getUser().setPassword(this.passwordEncoder.encode(funcionario.getUser().getPassword()));
		funcionario.getUser().setPassword(validateUserRequest(funcionario).getPassword());
		/*System.out.println("File:"+ funcionario.getUser().getFileUpload().getId());
		Long idFile = funcionario.getUser().getFileUpload().getId();
		System.out.println("idFile:"+ idFile);
		FileUpload fileUplad = new FileUpload();
		fileUplad.setId(idFile);
		fileUplad.setFile(funcionario.getUser().getFileUpload().getFile());
		fileUplad.setMimeType(funcionario.getUser().getFileUpload().getMimeType());
		fileUplad = this.fileUploadRepository.saveAndFlush(fileUplad);*/
		
		/*Usuario usuario = new Usuario();
		//usuario = this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());
		usuario.setEmail(funcionario.getUser().getEmail());
		
		usuario.setFileUpload(fileUplad);
		usuario.setNome(funcionario.getUser().getNome());
		usuario.setPassword(funcionario.getUser().getPassword());*/
		
		
		Usuario usuario = this.userRepository.saveAndFlush(funcionario.getUser());
		

		
		funcionario.setUser(usuario);
		return super.update(funcionario, errors);
	}
	
	private Usuario validateUserRequest(Funcionario funcionario) {
		//Usuario user = this.userRepository.findByEmail(currentUser.getActiveUser().getEmail());
		Usuario user = this.userRepository.findByEmail(funcionario.getUser().getEmail());
		if (funcionario.getUser().getEmail().compareToIgnoreCase(user.getEmail()) != 0) {
			throw new SecurityException();
		}

		return user;
	}
	
	@Override
	public ResponseEntity<?> deletar(@RequestBody Funcionario funcionario) {
		validateUserRequest(funcionario);

		return super.deletar(funcionario);
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
	
	 @RequestMapping(value = "/cidades", method = RequestMethod.GET)
	 @ResponseBody
	public List<TipoCidade> returnCidades() {
		
		return Arrays.asList(TipoCidade.values());
	}
	 
	 @RequestMapping(value = "/estados", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> returnEstados() {
		
		 String [] listTipoEstado = new String[TipoEstado.values().length] ;
		 int i = 0;
		 for (TipoEstado estado: TipoEstado.values()) {
			 listTipoEstado[i] = estado.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoEstado);
	}
	 
	 @RequestMapping(value = "/registrosprofissionais", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> returnTipoRegistroProfissional() {
		
		 String [] listTipoRegistroProfissional = new String[TipoRegistroProfissional.values().length] ;
		 int i = 0;
		 for (TipoRegistroProfissional registroProfissional: TipoRegistroProfissional.values()) {
			 listTipoRegistroProfissional[i] = registroProfissional.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoRegistroProfissional);
	}
	 
	 @RequestMapping(value = "/qtdAdmin", method = RequestMethod.GET)
	 @ResponseBody
	public int getQuantidadeAdmin() {
		 
		 Permissao permissao = permissaoRepository.findByRole("ROLE_ADMIN");
		
		 List<Usuario> usuario = userRepository.findByPermissoes(permissao);
		 
		return usuario.size();
	}
	 
	 @RequestMapping(value = "/matriculafuncionario", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> getMatriculaFuncionario() {
		 
		 String[] matricula = new String[1];
			matricula [0]	 = "MGXK-"+System.currentTimeMillis();
		 
		return Arrays.asList(matricula);
	}
	 
	 
	
}
