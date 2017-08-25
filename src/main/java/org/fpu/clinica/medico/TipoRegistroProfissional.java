package org.fpu.clinica.medico;

public enum TipoRegistroProfissional {

	CRAS("CRAS"),
	COREN("COREN"),
	CRF("CRF"),
	CRFA("CRFA"),
	CREFITO("CREFITO"),
	CRM("CRM"),
	CRN("CRN"),
	CRO("CRO"),
	CRP("CRP"),
	OUTROS("Outros Conselhos");
	

private String descricao;

TipoRegistroProfissional(String descricao){
	this.descricao = descricao;
}

public String getDescricao(){
	return descricao;
}
}
