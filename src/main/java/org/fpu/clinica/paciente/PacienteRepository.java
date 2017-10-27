package org.fpu.clinica.paciente;

import org.fpu.clinica.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente,Long> {
	public List<Paciente> findByUser(Usuario user);
	public Paciente findByMatricula(String matricula);
	
	public List<Paciente> findByStatus(String status);

	@Query("SELECT COUNT(*) FROM Paciente p")
	public Long findByQuantidadePacientes();

	public Long countBySexo(String Sexo);
	

}
