package org.fpu.clinica.cargo;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "tb_cargo")
@AttributeOverride(name = "id", column = @Column(name = "id_cargo"))
public class Cargo extends BaseEntity<Long>{


	private static final long serialVersionUID = 1L;
	
	@NotBlank
	@Size(max = 80)
	@Column(name= "nome", nullable = false, length = 80)
	private String nome;
	
	@NotBlank
	@Size(max = 80)
	@Column(name= "descricao", nullable = false, length = 80)
	private String descricao;
	
	public Cargo() {
		
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	
	
	
}
