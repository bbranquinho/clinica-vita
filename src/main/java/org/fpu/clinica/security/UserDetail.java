package org.fpu.clinica.security;

import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetail implements UserDetailsService{

	@Autowired
	private UsuarioRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario user = this.userRepository.findByEmail(email);
		
		if(user == null) {
			throw new UsernameNotFoundException("User with email \"" + email + "\" was not found");
		}
		
		LoginDetailBean login = new LoginDetailBean(user.getNome(), user.getEmail(), user.getPassword(), user.getFileUpload());
		
		for (Permissao permission: user.getPermissoes()) {
			login.addRole(permission.getRole());
		}
		
		return login;
	}

}
