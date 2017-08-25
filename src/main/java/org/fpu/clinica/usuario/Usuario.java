
package org.fpu.clinica.usuario;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.fpu.clinica.fileupload.FileUpload;
import org.fpu.clinica.permissao.Permissao;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tb_usuario")
public class Usuario extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;



	@NotBlank
	@Size(max = 80)
	@Column(name = "nome", nullable = false, length = 80)
	private String nome;

	@Column(name = "email", length = 255, nullable = false, unique = true)
	private String email;

	@Column(name = "password", length = 128, nullable = false)
	private String password;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_usuario_permissao", joinColumns = @JoinColumn(name = "usuario_id") , inverseJoinColumns = @JoinColumn(name = "permissao_id") )
	private List<Permissao> permissoes;

	@OneToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "id_file_upload_pessoa")
	private FileUpload fileUpload;

	public Usuario() {

	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore
	public String getPassword() {
		return this.password;
	}

	@JsonProperty("password")
	public void setPassword(String password) {
		this.password = password;
	}

	public List<Permissao> getPermissoes() {
		return permissoes;
	}

	public void setPermissoes(List<Permissao> permissoes) {
		this.permissoes = permissoes;
	}

	public FileUpload getFileUpload() {
		return fileUpload;
	}

	public void setFileUpload(FileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	

}
