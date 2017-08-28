package org.fpu.clinica.medico;

import java.util.List;

import org.fpu.clinica.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico,Long>{

	public List<Medico> findByUser(Usuario user);
	
	public List<Medico> findByStatus(String status);
	
	public Medico findByRegistroProfissional(String registroProfissional);
}
