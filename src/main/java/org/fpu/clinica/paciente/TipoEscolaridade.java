package org.fpu.clinica.paciente;

public enum TipoEscolaridade {
	ENSINOFUNDAMENTAL("Ensino Fundamental"),
	ENSINOFUNDAMENTALINCOMPLETO("Ensino Fundamental Incompleto"),
	ENSINOMEDIO("Ensino Médio"),
	ENSINOMEDIOINCOMPLETO("Ensino Médio Incompleto"),
	ENSINOSUPERIOR("Ensino Superior"),
	ENSINOSUPERIORINCOMPLETO("Ensino Superior Incompleto"),
	POSGRADUACAO("Pós Graduação"),
	MESTRADO("Mestrado"),
	DOUTORADO("Doutorado");
	

	private String descricao;
	
	TipoEscolaridade(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return descricao;
	}
}
