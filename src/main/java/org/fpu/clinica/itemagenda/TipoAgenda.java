package org.fpu.clinica.itemagenda;

public enum TipoAgenda {
	CONSULTA("Consulta"),
	ENCAIXE("Encaixe"),
	EXAME("Exame"),
	PRENATAL("Pré-natal"),
	RECONSULTA("Reconsulta");
	
	

	private String descricao;
	
	TipoAgenda(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return descricao;
	}
}
