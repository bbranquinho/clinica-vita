package org.fpu.clinica.estado;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "uf")
@AttributeOverride(name = "id", column = @Column(name = "cd_uf"))
public class Estado extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	@NotBlank
	@Column(name = "ds_uf_nome",nullable = false)
	private String nome;
	
	@Column(name = "ds_uf_sigla",length = 2)
	private String sigla;

	public Estado() {

	}

	public Estado(String nome, String sigla) {
		super();
		this.nome = nome;
		this.sigla = sigla;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}
}