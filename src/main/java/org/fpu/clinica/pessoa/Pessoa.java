package org.fpu.clinica.pessoa;

import java.util.Date;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.fpu.clinica.usuario.Usuario;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tb_pessoa")
@AttributeOverride(name = "id", column = @Column(name = "id_pessoa"))
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "TIPO_PESSOA", discriminatorType = DiscriminatorType.INTEGER)
public abstract class Pessoa extends BaseEntity<Long> {

	private static final long serialVersionUID = 1L;

	@NotBlank
	@Column(nullable = false, length = 15, unique = true)
	private String rg;

	@NotBlank
	@Column(nullable = false, length = 14, unique = true)
	private String cpf;

	/*
	 * @NotNull(message = "Não pode estar em branco")
	 * 
	 * @Enumerated(EnumType.STRING)
	 * 
	 * @Column(nullable = false, length = 10) private TipoSexo sexo;
	 */

	@NotBlank
	@Column(nullable = false, length = 20)
	private String sexo;

	@NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
	// @Past(message = "insira uma data valida") // JSR 303 Validated ?
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_nascimento")
	private Date dataNascimento;

	@NotBlank
	@Column(nullable = false, length = 15)
	private String telefone;

	@NotBlank
	@Column(nullable = false, length = 150)
	private String cep;

	@NotBlank
	@Column(nullable = false, length = 150)
	private String rua;

	@NotBlank
	@Column(nullable = false, length = 20)
	private String numero;

	@NotBlank
	@Column(nullable = false, length = 70)
	private String bairro;

	@NotBlank
	@Column(nullable = false, length = 70)
	private String cidade;

	@NotBlank
	@Column(nullable = false, length = 50)
	private String estado;

	@NotBlank
	@Column(nullable = false, length = 20)
	private String status;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private Usuario user;

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Usuario getUser() {
		return user;
	}

	public void setUser(Usuario user) {
		this.user = user;
	}

	

}
