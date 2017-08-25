package org.fpu.clinica.paciente;

public enum TipoFatorSanguineo {
	ONEGATIVO("O-"),
	OPOSITIVO("O+"),
	APOSITIVO("A+"),
	BNEGATIVO("B-"),
	BPOSITIVO("B+"),
	ABNEGATIVO("AB-"),
	ABPOSITIVO("AB+");

	private String descricao;
	
	TipoFatorSanguineo(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return descricao;
	}
}
