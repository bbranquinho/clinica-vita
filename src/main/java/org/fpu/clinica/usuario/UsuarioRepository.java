package org.fpu.clinica.usuario;

import java.util.List;

import org.fpu.clinica.permissao.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	public Usuario findByEmail(String email);
	public List<Usuario> findByPermissoes(Permissao permissao);
	public Usuario findByNome(String nome);

}
