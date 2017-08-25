package org.fpu.clinica.convenio;

import java.util.List;

import org.fpu.clinica.medico.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvenioRepository extends JpaRepository<Convenio,Long> {

	List<Convenio> findByMedicos(Medico medico);
}
