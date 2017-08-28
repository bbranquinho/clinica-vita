package org.fpu.clinica.cidade;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CidadeRepository extends JpaRepository<Cidade,Long>{
	
	public Cidade findByNome(String nome);
}
