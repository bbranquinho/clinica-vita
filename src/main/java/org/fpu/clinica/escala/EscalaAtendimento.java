package org.fpu.clinica.escala;

import java.util.Date;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.utils.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tb_escala_atendimento")
@AttributeOverride(name = "id", column = @Column(name = "id_escala_atendimento"))
public class EscalaAtendimento extends BaseEntity<Long>{

	private static final long serialVersionUID = 1L;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "medico_id", nullable = false)
	private Medico medico;
	
	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	//@Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy",locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_modificacao")
	private Date dataModificacao;
	
	public EscalaAtendimento() {
		// TODO Auto-generated constructor stub
	}

	public Medico getMedico() {
		return medico;
	}

	public void setMedico(Medico medico) {
		this.medico = medico;
	}

	public Date getDataModificacao() {
		return dataModificacao;
	}

	public void setDataModificacao(Date dataModificacao) {
		this.dataModificacao = dataModificacao;
	}

	
	
}
