package org.fpu.clinica.utils;

public final class ServicePath {

	//----ROOT PATH
	
	public static final String ALL = "/**";
	
	public static final String ROOT_PATH = "/api";
	
	public static final String PUBLIC_ROOT_PATH = ROOT_PATH + "/public";
	
	public static final String PRIVATE_ROOT_PATH = ROOT_PATH + "/private";
	
	//-----PRIVATE PATHS
	
	
	public static final String AGENDA_PATH =  PRIVATE_ROOT_PATH + "/agenda";
	
	public static final String ITEM_AGENDA_PATH =  PRIVATE_ROOT_PATH + "/item_agenda";
	
	public static final String CARGO_PATH =  PRIVATE_ROOT_PATH + "/cargo";
	
	public static final String SETOR_PATH =  PRIVATE_ROOT_PATH + "/setor";
	
	public static final String MEDICO_PATH = PRIVATE_ROOT_PATH + "/medico";

	public static final String BAIRRO_PATH = PRIVATE_ROOT_PATH + "/bairro";
	
	public static final String CONVENIO_PATH = PRIVATE_ROOT_PATH + "/convenio";

	public static final String CIDADE_PATH = PRIVATE_ROOT_PATH + "/cidade";
	
	public static final String CHAT_PATH = PRIVATE_ROOT_PATH + "/chat";
	
	public static final String ESTADO_PATH = PRIVATE_ROOT_PATH + "/estado";
	
	public static final String LOGRADOURO_PATH = PRIVATE_ROOT_PATH + "/logradouro";
	
	public static final String PACIENTE_PATH = PRIVATE_ROOT_PATH + "/paciente";
	
	public static final String FUNCIONARIO_PATH = PRIVATE_ROOT_PATH + "/funcionario";
	
	public static final String FILE_UPLOAD_PATH = PRIVATE_ROOT_PATH + "/fileupload";
	
	public static final String PERMISSAO_PATH = PRIVATE_ROOT_PATH + "/permissao";
	
	public static final String USUARIO_PERMISSAO_PATH = PRIVATE_ROOT_PATH + "/usuario_permissao";
	
	public static final String USUARIO_PATH = PRIVATE_ROOT_PATH + "/usuario";
	
	//------PUBLIC PATHS
	
	public static final String H2_PATH = PUBLIC_ROOT_PATH + "/h2/**";
	
	public static final String LOGIN_PATH = PUBLIC_ROOT_PATH + "/login";

	public static final String LOGOUT_PATH = PUBLIC_ROOT_PATH + "/logout";
	

	
}
