package org.fpu.clinica.logradouro;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.fpu.clinica.bairro.Bairro;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "logradouros")
@AttributeOverride(name = "id", column = @Column(name = "cd_logradouro"))
public class Logradouro extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "cd_bairro")
	private Bairro bairro;

	@NotBlank
	@Column(name = "ds_logradouro_nome", nullable = false)
	private String nome;

	@NotBlank
	@Column(name = "no_logradouro_cep", nullable = false)
	private String cep;

	public Logradouro() {

	}

	public Logradouro(Bairro bairro, String nome, String cep) {
		super();
		this.bairro = bairro;
		this.nome = nome;
		this.cep = cep;
	}

	public Bairro getBairro() {
		return bairro;
	}

	public void setBairro(Bairro bairro) {
		this.bairro = bairro;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	
}
