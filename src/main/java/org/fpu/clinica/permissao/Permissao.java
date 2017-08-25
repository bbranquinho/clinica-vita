package org.fpu.clinica.permissao;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.fpu.clinica.utils.BaseEntity;

@Entity
@Table(name = "tb_permissao")
@AttributeOverride(name = "id", column = @Column(name = "pk_id"))
public class Permissao extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	@Column(name = "role")
	private String role;

	public Permissao() {

	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
