package org.fpu.clinica.bairro;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BairroRepository extends JpaRepository<Bairro, Long> {

	public Bairro findByNome(String nome);
}
