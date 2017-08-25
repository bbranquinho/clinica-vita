package org.fpu.clinica.usuariopermissao;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.fpu.clinica.utils.BaseEntity;

@Entity
@Table(name = "tb_usuario_permissao")
public class UsuarioPermissao extends BaseEntity<UsuarioPermissaoKey> {
	
	private static final long serialVersionUID = 1L;
}
