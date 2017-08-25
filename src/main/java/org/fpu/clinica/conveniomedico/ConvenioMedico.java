package org.fpu.clinica.conveniomedico;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.fpu.clinica.utils.BaseEntity;

@Entity
@Table(name = "tb_convenio_medico")
public class ConvenioMedico extends BaseEntity<ConvenioMedicoKey> {

	private static final long serialVersionUID = 1L;

}
