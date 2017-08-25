package org.fpu.clinica.bairro;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.fpu.clinica.cidade.Cidade;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "bairros")
@AttributeOverride(name = "id", column = @Column(name = "cd_bairro"))
public class Bairro extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	
	@ManyToOne
	@JoinColumn(name = "cd_cidade")
	private Cidade cidade;
	
	@NotBlank
	@Column(name = "ds_bairro_nome", nullable = false)
	private String nome;

	public Bairro() {

	}
	
	public Bairro(String nome, Cidade cidade) {
		super();
		this.nome = nome;
		this.cidade = cidade;
	}

	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

	public Cidade getCidade() {
		return cidade;
	}
	public void setCidade(Cidade cidade) {
		this.cidade = cidade;
	}
}
