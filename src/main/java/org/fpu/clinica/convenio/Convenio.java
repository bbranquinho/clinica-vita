package org.fpu.clinica.convenio;

import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.utils.BaseEntity;

@Entity
@Table(name = "tb_convenio")
@AttributeOverride(name = "id", column = @Column(name = "id_convenio"))
public class Convenio extends BaseEntity<Long>{

	
	private static final long serialVersionUID = 1L;

	private String registroAns;
	
	private String razaoSocial;
	
	private String nomeFantasia;
	
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_convenio_medico", joinColumns = @JoinColumn(name = "convenio_id"), inverseJoinColumns = @JoinColumn(name = "medico_id"))
	private List<Medico> medicos;
	
	public Convenio() {
	
	}

	public String getRegistroAns() {
		return registroAns;
	}

	public void setRegistroAns(String registroAns) {
		this.registroAns = registroAns;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}

	public String getNomeFantasia() {
		return nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public List<Medico> getMedicos() {
		return medicos;
	}

	public void setMedicos(List<Medico> medicos) {
		this.medicos = medicos;
	}

	
	
	
	
}
