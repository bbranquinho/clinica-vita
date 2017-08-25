package org.fpu.clinica.security;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.fpu.clinica.fileupload.FileUpload;
import org.fpu.clinica.utils.BaseBean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class LoginDetailBean extends BaseBean implements UserDetails {

	private static final long serialVersionUID = 1L;

	private final String nome;

	private final String email;

	private final String password;

	private final Set<String> roles;
	
	private final FileUpload file;

	public LoginDetailBean(String nome, String email, String passwordHash, FileUpload file) {
		this.nome = nome;
		this.email = email;
		this.password = passwordHash;
		this.roles = new HashSet<String>();
		this.file = file;
	}

	public Set<String> getRoles() {
		return this.roles;
	}

	public void addRole(String role) {
		this.roles.add(role);
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<String> roles = this.getRoles();

		if (roles == null) {
			return Collections.emptyList();
		}

		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

		for (String role : roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}
		return authorities;
	}

	@Override
	public String getUsername() {
		return this.nome;
	}
	
	public String getEmail() {
		return email;
	}
		

	public FileUpload getFile() {
		return this.file;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
