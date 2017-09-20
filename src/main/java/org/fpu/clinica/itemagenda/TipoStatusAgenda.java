package org.fpu.clinica.itemagenda;

public enum TipoStatusAgenda {
	DISPONIVEL("Disponivel"),
	AGUARDANDOAUTORIZACAO("Aguardando Autorização"),
	NAOAUTORIZADO("Não-autorizado"),
	NAOAGENDADO("Não-agendado"),
	AGENDADO("Agendado"),
	FINALIZADO("Finalizado"),
	PREATENDIMENTO("Pré-atendimento"),
	REMARCOU("Remarcou"),
	FALTOU("Faltou"),
	CANCELADO("Cancelado");


	private String descricao;
	
	TipoStatusAgenda(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return descricao;
	}
}
