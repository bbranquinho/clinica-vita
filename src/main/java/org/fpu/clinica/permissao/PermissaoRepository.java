package org.fpu.clinica.permissao;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissaoRepository extends JpaRepository<Permissao,Long> {

	public Permissao findByRole(String role);
}
