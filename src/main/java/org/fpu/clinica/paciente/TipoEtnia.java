package org.fpu.clinica.paciente;

public enum TipoEtnia {
	BRANCA("Branca"),
	PARDA("Parda"),
	NEGRA("Negra"),
	ORIENTAL("Oriental"),
	ASIATICA("Asiática"),
	INDIGENA("Indígena"),
	NAOLISTADO("Não Listado");
	

	private String descricao;
	
	TipoEtnia(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return descricao;
	}
}
