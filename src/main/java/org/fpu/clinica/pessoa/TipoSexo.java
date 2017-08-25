package org.fpu.clinica.pessoa;

public enum TipoSexo {
	MASCULINO("Masculino"),
	FEMININO("Feminino");

	private String descricao;
	
	TipoSexo(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return descricao;
	}
}
