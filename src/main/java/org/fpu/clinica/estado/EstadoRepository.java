package org.fpu.clinica.estado;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoRepository extends JpaRepository<Estado,Long>{

	public Estado findByNome(String nome);
	
}
