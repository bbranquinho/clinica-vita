package org.fpu.clinica.funcionario;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import org.fpu.clinica.cargo.Cargo;
import org.fpu.clinica.pessoa.Pessoa;
import org.fpu.clinica.setor.Setor;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tb_funcionario")
@DiscriminatorValue("2")
public class Funcionario extends Pessoa {

	

	
	
	@NotNull(message="Não pode estar em branco")      //JSR 303 Validated ?
	@Past (message="insira uma data valida")     //JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_admissao")
	private Date dataAdmissao;
	
	@NotBlank 
	@Column(nullable = false, length = 20, unique = true)
	private String matricula;
	
	
	@ManyToOne
	@JoinColumn(name = "setor_id", nullable = false)
	public Setor setor;

	@ManyToOne
	@JoinColumn(name = "cargo_id", nullable = false)
	public Cargo cargo;

	public Date getDataAdmissao() {
		return dataAdmissao;
	}

	public void setDataAdmissao(Date dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}
	
	

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
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