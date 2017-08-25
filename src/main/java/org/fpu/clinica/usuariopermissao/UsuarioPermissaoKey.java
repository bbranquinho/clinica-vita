package org.fpu.clinica.usuariopermissao;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.fpu.clinica.utils.BaseKey;

@Embeddable
public class UsuarioPermissaoKey extends BaseKey {

	private static final long serialVersionUID = 201602010536L;

	@Column(name = "permissao_id", length = 11, nullable = false)
	private Long permissaoId;

	@Column(name = "usuario_id", length = 11, nullable = false)
	private Long usuarioId;

	public UsuarioPermissaoKey() {

	}

	public Long getPermissaoId() {
		return permissaoId;
	}

	public void setPermissaoId(Long permissaoId) {
		this.permissaoId = permissaoId;
	}

	public Long getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}
	
	/*@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;

		result = prime * result + ((this.permissaoId == null) ? 0 : this.permissaoId.hashCode());
		result = prime * result + ((this.usuarioId == null) ? 0 : this.usuarioId.hashCode());

		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (!super.equals(obj)) {
			return false;
		}

		if (this.getClass() != obj.getClass()) {
			return false;
		}

		UsuarioPermissaoKey other = (UsuarioPermissaoKey) obj;

		if (this.permissaoId == null) {
			if (other.permissaoId != null) {
				return false;
			}
		} else if (!this.permissaoId.equals(other.permissaoId)) {
			return false;
		}

		if (this.usuarioId == null) {
			if (other.usuarioId != null) {
				return false;
			}
		} else if (!this.usuarioId.equals(other.usuarioId)) {
			return false;
		}

		return true;
	}*/

}
