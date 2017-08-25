package org.fpu.clinica.conveniomedico;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.fpu.clinica.utils.BaseKey;

@Embeddable
public class ConvenioMedicoKey extends BaseKey {

	private static final long serialVersionUID = 1L;
	
	@Column(name = "convenio_id", length = 11, nullable = false)
	private Long convenioId;
	
	@Column(name = "medico_id", length = 11, nullable = false)
	private Long MedicoId;
	
	public ConvenioMedicoKey() {
	
	}

	public Long getConvenioId() {
		return convenioId;
	}

	public void setConvenioId(Long convenioId) {
		this.convenioId = convenioId;
	}

	public Long getMedicoId() {
		return MedicoId;
	}

	public void setMedicoId(Long medicoId) {
		MedicoId = medicoId;
	}
	
	

}
