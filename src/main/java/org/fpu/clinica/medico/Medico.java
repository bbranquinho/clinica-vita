package org.fpu.clinica.medico;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.convenio.Convenio;
import org.fpu.clinica.pessoa.Pessoa;
import org.fpu.clinica.setor.Setor;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tb_medico")
@DiscriminatorValue("3")
public class Medico extends Pessoa {

	private static final long serialVersionUID = 1L;

	@NotBlank
	@Column(name = "registro_profissional", length = 10, nullable = false, unique = true)
	private String registroProfissional;

	@NotBlank
	@Column(name = "especialidade", length = 60, nullable = false)
	private String especialidade;

	@NotBlank
	@Column(nullable = false, length = 70)
	private String tipoRegistro;

	@NotBlank
	@Column(nullable = false, length = 50)
	private String estadoRegistro;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	// @Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_admissao")
	private Date dataAdmissao;

	@ManyToOne
	@JoinColumn(name = "setor_id", nullable = false)
	public Setor setor;

	@ManyToOne
	@JoinColumn(name = "cargo_id", nullable = false)
	public Cargo cargo;
	

	

	public Medico() {
		// TODO Auto-generated constructor stub
	}

	public String getRegistroProfissional() {
		return registroProfissional;
	}

	public void setRegistroProfissional(String registroProfissional) {
		this.registroProfissional = registroProfissional;
	}

	public String getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(String especialidade) {
		this.especialidade = especialidade;
	}

	public String getTipoRegistro() {
		return tipoRegistro;
	}

	public void setTipoRegistro(String tipoRegistro) {
		this.tipoRegistro = tipoRegistro;
	}

	public String getEstadoRegistro() {
		return estadoRegistro;
	}

	public void setEstadoRegistro(String estadoRegistro) {
		this.estadoRegistro = estadoRegistro;
	}

	public Date getDataAdmissao() {
		return dataAdmissao;
	}

	public void setDataAdmissao(Date dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}

	public Setor getSetor() {
		return setor;
	}

	public void setSetor(Setor setor) {
		this.setor = setor;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}


	
	

}
