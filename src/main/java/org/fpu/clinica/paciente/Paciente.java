package org.fpu.clinica.paciente;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.fpu.clinica.pessoa.Pessoa;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "tb_paciente")
@DiscriminatorValue("1")
public class Paciente extends Pessoa {

	@NotBlank
	@Column(nullable = false, length = 20, unique = true)
	private String matricula;
	
	@NotBlank
	@Column(nullable = false, length = 20, unique = true)
	private String cns;
	
	@NotBlank
	@Column(nullable = false, length = 4, unique = false)
	private String fatorSanguineo;
	
	@NotBlank
	@Column(nullable = false, length = 15, unique = false)
	private String estadoCivil;
	
	@NotBlank
	@Column(nullable = false, length = 15, unique = false)
	private String etnia;
	
	@NotBlank
	@Column(nullable = false, length = 80, unique = false)
	private String escolaridade;
	
	@NotBlank
	@Column(nullable = false, length = 30, unique = false)
	private String profissao;
	
	@NotBlank
	@Column(nullable = false, length = 80, unique = false)
	private String nomePai;
	
	@NotBlank
	@Column(nullable = false, length = 80, unique = false)
	private String nomeMae;
	
	@NotBlank
	@Column(nullable = false, length = 80, unique = false)
	private String nomeConjuge;
	
	@NotBlank
	@Column(nullable = false, length = 25, unique = false)
	private String hobbie;

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public String getFatorSanguineo() {
		return fatorSanguineo;
	}

	public void setFatorSanguineo(String fatorSanguineo) {
		this.fatorSanguineo = fatorSanguineo;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}


	public String getEtnia() {
		return etnia;
	}

	public void setEtnia(String etnia) {
		this.etnia = etnia;
	}

	public String getEscolaridade() {
		return escolaridade;
	}

	public void setEscolaridade(String escolaridade) {
		this.escolaridade = escolaridade;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getNomeConjuge() {
		return nomeConjuge;
	}

	public void setNomeConjuge(String nomeConjuge) {
		this.nomeConjuge = nomeConjuge;
	}

	public String getHobbie() {
		return hobbie;
	}

	public void setHobbie(String hobbie) {
		this.hobbie = hobbie;
	}


	
}
