package org.fpu.clinica.medico;

import org.fpu.clinica.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicoRepository extends JpaRepository<Medico,Long>{

	public List<Medico> findByUser(Usuario user);
	
	public List<Medico> findByStatus(String status);
	
	public Medico findByRegistroProfissional(String registroProfissional);

	@Query("SELECT COUNT(*) FROM Medico")
	public Long findByQuantidadeMedicos();


}
