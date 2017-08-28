package org.fpu.clinica.paciente;

import java.util.List;

import org.fpu.clinica.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente,Long> {
	public List<Paciente> findByUser(Usuario user);
	public Paciente findByMatricula(String matricula);
	
	public List<Paciente> findByStatus(String status);
	

}
