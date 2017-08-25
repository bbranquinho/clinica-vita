package org.fpu.clinica.agenda;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendaRepository extends JpaRepository<Agenda, Long>{

	Agenda findBydataHoraInicialConsulta(Date dataAgendamento);
}
