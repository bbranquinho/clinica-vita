package org.fpu.clinica.agenda;

import java.util.Date;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.fpu.clinica.itemagenda.ItemAgenda;
import org.fpu.clinica.utils.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tb_agenda")
@AttributeOverride(name = "id", column = @Column(name = "id_agenda"))
public class Agenda extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

/*	@OneToMany(mappedBy = "agenda")
	@Size(max = 3)
	private List<ItemAgenda> ItensAgenda;
	*/
	
	
	private Integer max_qtd_itemAgenda;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	//@Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy",locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_agendamento")
	private Date dataAgendamento;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	//@Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss",locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_inicial_consulta")
	private Date dataHoraInicialConsulta;
	
	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	//@Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss",locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_final_consulta")
	private Date dataHoraFinalConsulta;
	
	public Agenda() {
		
	}
	
	

	public Agenda(Integer max_qtd_itemAgenda, Date dataAgendamento, Date dataHoraInicialConsulta,
			Date dataHoraFinalConsulta) {
		super();
		this.max_qtd_itemAgenda = max_qtd_itemAgenda;
		this.dataAgendamento = dataAgendamento;
		this.dataHoraInicialConsulta = dataHoraInicialConsulta;
		this.dataHoraFinalConsulta = dataHoraFinalConsulta;
	}



	public Integer getMax_qtd_itemAgenda() {
		return max_qtd_itemAgenda;
	}



	public void setMax_qtd_itemAgenda(Integer max_qtd_itemAgenda) {
		this.max_qtd_itemAgenda = max_qtd_itemAgenda;
	}



	public Date getDataAgendamento() {
		return dataAgendamento;
	}



	public void setDataAgendamento(Date dataAgendamento) {
		this.dataAgendamento = dataAgendamento;
	}



	public Date getDataHoraInicialConsulta() {
		return dataHoraInicialConsulta;
	}



	public void setDataHoraInicialConsulta(Date dataHoraInicialConsulta) {
		this.dataHoraInicialConsulta = dataHoraInicialConsulta;
	}



	public Date getDataHoraFinalConsulta() {
		return dataHoraFinalConsulta;
	}



	public void setDataHoraFinalConsulta(Date dataHoraFinalConsulta) {
		this.dataHoraFinalConsulta = dataHoraFinalConsulta;
	}



	

	
	
	
	/*@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	@Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	@Temporal(TemporalType.TIME)
	@Column(name = "hora_consulta")
	private Date horaConsulta;*/

	
	

}
