package org.fpu.clinica.usuario;

import java.util.Arrays;
import java.util.List;

import org.fpu.clinica.security.CurrentUser;
import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.USUARIO_PATH)
public class UsuarioService extends GenericService<Usuario, Long> {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UsuarioRepository userRepository;
	@Autowired
	private CurrentUser currentUser;
	
	 @RequestMapping(value = "/findCurrentUser", method = RequestMethod.GET)
	 @ResponseBody
	public List<Usuario> findCurrentUser() {
		 
		 String email = currentUser.getActiveUser().getEmail();
		 
		 Usuario usuario = this.userRepository.findByEmail(email);
		return Arrays.asList(usuario); 
		
	}
	 
	
	
	@Override
	public ResponseEntity<?> insert(@RequestBody Usuario user, Errors erros) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		return super.insert(user, erros);
	}

	public ResponseEntity<?> update(@RequestBody Usuario user, Errors errors) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		return super.update(user, errors);
	}

}
