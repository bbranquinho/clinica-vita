package org.fpu.clinica.itemagenda;

import org.fpu.clinica.agenda.Agenda;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.paciente.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ItemAgendaRepository extends JpaRepository<ItemAgenda, Long>{
	
	public List<ItemAgenda> findByAgenda(Agenda agenda);
	
	public List<ItemAgenda> findByMedico(Medico medico);
	
	@Query("select i from ItemAgenda i where i.agenda.dataHoraInicialConsulta >= ?1 and i.agenda.dataHoraInicialConsulta <= ?2 "
			+ "and i.medico = ?3 and i.statusAgenda = 'Disponivel'")
	List<ItemAgenda> findbyDateAgenda(Date dataAgendamentoInicial, Date DataAgendamentoFinal,Medico medico);
	
	
	
	@Query("select i from ItemAgenda i where i.paciente = ?1")
	List<ItemAgenda> findCompromissosPaciente(Paciente paciente);

	Long countByStatusAgendaOrStatusAgenda(String status1, String status2);

	@Query("select count(*) from ItemAgenda as i inner join  i.agenda as agenda where extract(month from i.agenda.dataHoraInicialConsulta) = ?1 and i.paciente.sexo = ?2")
	public Long findByQuantidadeAgendamentoMesSexo(int mes, String sexo);

}
