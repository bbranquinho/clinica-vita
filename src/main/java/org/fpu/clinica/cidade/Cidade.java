package org.fpu.clinica.cidade;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.fpu.clinica.estado.Estado;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "cidades")
@AttributeOverride(name = "id", column = @Column(name = "cd_cidade"))
public class Cidade extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "cd_uf")
	private Estado estado;

	@NotBlank
	@Column(name = "ds_cidade_nome", nullable = false)
	private String nome;

	public Cidade() {

	}

	public Cidade(String nome, Estado estado) {
		this.nome = nome;
		this.estado = estado;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}
}
