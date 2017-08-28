package org.fpu.clinica.cargo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CargoRepository extends JpaRepository<Cargo, Long>{
	
	public Cargo findByNome(String nome);
}
