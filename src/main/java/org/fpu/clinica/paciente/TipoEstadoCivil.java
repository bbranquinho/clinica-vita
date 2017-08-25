package org.fpu.clinica.paciente;

public enum TipoEstadoCivil {
	CASADO("Casado"),
	DIVORCIADO("Divorciado"),
	SOLTEIRO("Solteiro"),
	SEPARADO("Separado"),
	VIUVO("Viúvo"),
	UNIAOESTAVEL("União Estável"),
	NAOLISTADO("Não Listado");
	

	private String descricao;
	
	TipoEstadoCivil(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return descricao;
	}
}
