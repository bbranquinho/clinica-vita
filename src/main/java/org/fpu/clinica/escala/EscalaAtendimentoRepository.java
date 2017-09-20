package org.fpu.clinica.escala;

import org.fpu.clinica.medico.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EscalaAtendimentoRepository extends JpaRepository<EscalaAtendimento,Long>{

    public EscalaAtendimento findByMedico(Medico medico);
}
