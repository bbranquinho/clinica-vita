package org.fpu.clinica.itemagenda;

import java.math.BigDecimal;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import org.fpu.clinica.agenda.Agenda;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.paciente.Paciente;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "tb_item_agenda")
@AttributeOverride(name = "id", column = @Column(name = "id_item_agenda"))
public class ItemAgenda extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "id_agenda", nullable = false)
	public Agenda agenda;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "medico_id", nullable = false)
	private Medico medico;

	// @NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "paciente_id", nullable = true)
	private Paciente paciente;

	@NotNull
	@DecimalMin("10.00")
	@DecimalMax("999.99")
	@Column(name = "valor_consulta", nullable = false, precision = 10, scale = 2)
	private BigDecimal valorConsulta;

	@NotBlank
	@Column(nullable = false, length = 30)
	private String tipoAgenda;

	@Column(nullable = false, length = 30)
	private String statusAgenda;
	
	
	public ItemAgenda() {
	
	}


	public ItemAgenda(Agenda agenda, Medico medico, BigDecimal valorConsulta, String consulta,
			String disponivel) {
		super();
		this.agenda = agenda;
		this.medico = medico;
		this.valorConsulta = valorConsulta;
		this.tipoAgenda = consulta;
		this.statusAgenda = disponivel;
	}


	public Agenda getAgenda() {
		return agenda;
	}


	public void setAgenda(Agenda agenda) {
		this.agenda = agenda;
	}


	public Medico getMedico() {
		return medico;
	}


	public void setMedico(Medico medico) {
		this.medico = medico;
	}


	public Paciente getPaciente() {
		return paciente;
	}


	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}


	public BigDecimal getValorConsulta() {
		return valorConsulta;
	}


	public void setValorConsulta(BigDecimal valorConsulta) {
		this.valorConsulta = valorConsulta;
	}


	public String getTipoAgenda() {
		return tipoAgenda;
	}


	public void setTipoAgenda(String tipoAgenda) {
		this.tipoAgenda = tipoAgenda;
	}


	public String getStatusAgenda() {
		return statusAgenda;
	}


	public void setStatusAgenda(String statusAgenda) {
		this.statusAgenda = statusAgenda;
	}
	
	

}
