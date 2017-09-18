package org.fpu.clinica.itemescala;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.fpu.clinica.escala.EscalaAtendimento;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "tb_item_escala_atendimento")
@AttributeOverride(name = "id", column = @Column(name = "id_item_escala_atendimento"))
public class ItemEscalaAtendimento extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "id_escala_atendimento")
	public EscalaAtendimento escalaAtendimento;

	@NotBlank
	@Column(name = "periodo", length = 20, nullable = false)
	private String periodo;

	@Column(name = "intervalo_agendamento")
	private Integer intervaloAgendamento;

	@Column(name = "quantidade_vagas")
	private Integer quantidadeVagas;

	@NotBlank
	@Column(name = "tipo_atendimento", length = 30, nullable = false)
	private String tipoAtendimento;

	@NotBlank
	@Column(name = "dia_semana", length = 30, nullable = false, unique = true)
	private String diaSemana;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	// @Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIME)
	@Column(name = "hora_entrada")
	private Date horaEntrada;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	// @Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIME)
	@Column(name = "hora_saida")
	private Date horaSaida;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	// @Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIME)
	@Column(name = "hora_pausa_entrada")
	private Date horaPausaEntrada;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	// @Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
	@Temporal(TemporalType.TIME)
	@Column(name = "hora_pausa_termino")
	private Date horaPausaTermino;

	public ItemEscalaAtendimento() {
		// TODO Auto-generated constructor stub
	}

	public EscalaAtendimento getEscalaAtendimento() {
		return escalaAtendimento;
	}

	public void setEscalaAtendimento(EscalaAtendimento escalaAtendimento) {
		this.escalaAtendimento = escalaAtendimento;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public Integer getIntervaloAgendamento() {
		return intervaloAgendamento;
	}

	public void setIntervaloAgendamento(Integer intervaloAgendamento) {
		this.intervaloAgendamento = intervaloAgendamento;
	}

	public Integer getQuantidadeVagas() {
		return quantidadeVagas;
	}

	public void setQuantidadeVagas(Integer quantidadeVagas) {
		this.quantidadeVagas = quantidadeVagas;
	}

	public String getTipoAtendimento() {
		return tipoAtendimento;
	}

	public void setTipoAtendimento(String tipoAtendimento) {
		this.tipoAtendimento = tipoAtendimento;
	}

	public String getDiaSemana() {
		return diaSemana;
	}

	public void setDiaSemana(String diaSemana) {
		this.diaSemana = diaSemana;
	}

	public Date getHoraEntrada() {
		return horaEntrada;
	}

	public void setHoraEntrada(Date horaEntrada) {
		this.horaEntrada = horaEntrada;
	}

	public Date getHoraSaida() {
		return horaSaida;
	}

	public void setHoraSaida(Date horaSaida) {
		this.horaSaida = horaSaida;
	}

	public Date getHoraPausaEntrada() {
		return horaPausaEntrada;
	}

	public void setHoraPausaEntrada(Date horaPausaEntrada) {
		this.horaPausaEntrada = horaPausaEntrada;
	}

	public Date getHoraPausaTermino() {
		return horaPausaTermino;
	}

	public void setHoraPausaTermino(Date horaPausaTermino) {
		this.horaPausaTermino = horaPausaTermino;
	}
}
