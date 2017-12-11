drop table if exists public.tb_file_upload;
drop table if exists public.tb_usuario;
drop table if exists public.tb_permissao;
drop table if exists public.tb_usuario_permissao;
drop table if exists public.tb_pessoa;
drop table if exists public.tb_cargo;
drop table if exists public.tb_setor;
drop table if exists public.tb_paciente;
drop table if exists public.tb_funcionario;
drop table if exists public.tb_medico;
drop table if exists public.tb_convenio;
drop table if exists public.tb_convenio_medico;
drop table if exists public.tb_agenda;
drop table if exists public.tb_item_agenda;
drop table if exists public.tb_escala_atendimento;
drop table if exists public.tb_item_escala_atendimento;

CREATE TABLE public.tb_file_upload (
  id_file_upload bigint(20) NOT NULL AUTO_INCREMENT,
  file varchar(65535),
  mime_type varchar(255) DEFAULT NULL,
  PRIMARY KEY (id_file_upload)
); 
 create table public.tb_permissao (
  pk_id bigint(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  role varchar(255) DEFAULT NULL
 );

create table public.tb_usuario (
  id bigint(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email varchar(255) NOT NULL,
  nome varchar(80) NOT NULL,
  password varchar(128) NOT NULL,
  id_file_upload_pessoa bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT UK_spmnyb4dsul95fjmr5kmdmvub UNIQUE(email),
  FOREIGN KEY (id_file_upload_pessoa) REFERENCES public.tb_file_upload(id_file_upload)
);

 create table public.tb_usuario_permissao (
  permissao_id bigint(20) NOT NULL,
  usuario_id bigint(20) NOT NULL,
  FOREIGN KEY (permissao_id) REFERENCES public.tb_permissao(pk_id),
  FOREIGN KEY (usuario_id) REFERENCES public.tb_usuario(id)
 );

create table public.tb_pessoa (
  tipo_pessoa int(11) NOT NULL,
  id_pessoa bigint(20) NOT NULL AUTO_INCREMENT,
  bairro varchar(70) NOT NULL,
  cep varchar(150) NOT NULL,
  cidade varchar(70) NOT NULL,
  cpf varchar(14) NOT NULL,
  data_nascimento datetime NOT NULL,
  estado varchar(50) NOT NULL,
  numero varchar(20) NOT NULL,
  rg varchar(15) NOT NULL,
  rua varchar(150) NOT NULL,
  sexo varchar(20) NOT NULL,
  status varchar(20) NOT NULL,
  telefone varchar(15) NOT NULL,
  user_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id_pessoa),
  CONSTRAINT UK_n8mobknkuk6hwj7nqpfqgqx69 UNIQUE(cpf),
  CONSTRAINT UK_l584y750sna251pduax7nmrp4 UNIQUE(rg),
  FOREIGN KEY (user_id) REFERENCES public.tb_usuario(id)
);

CREATE TABLE public.tb_cargo (
  id_cargo bigint(20) NOT NULL AUTO_INCREMENT,
  descricao varchar(80) NOT NULL,
  nome varchar(80) NOT NULL,
  PRIMARY KEY (id_cargo)
);

CREATE TABLE public.tb_setor (
  id_setor bigint(20) NOT NULL AUTO_INCREMENT,
  descricao varchar(80) NOT NULL,
  nome varchar(80) NOT NULL,
  PRIMARY KEY (id_setor)
);

CREATE TABLE public.tb_paciente (
  cns varchar(20) NOT NULL,
  escolaridade varchar(80) NOT NULL,
  estado_civil varchar(15) NOT NULL,
  etnia varchar(15) NOT NULL,
  fator_sanguineo varchar(4) NOT NULL,
  hobbie varchar(25) NOT NULL,
  matricula varchar(20) NOT NULL,
  nome_conjuge varchar(80) NOT NULL,
  nome_mae varchar(80) NOT NULL,
  nome_pai varchar(80) NOT NULL,
  profissao varchar(30) NOT NULL,
  id_pessoa bigint(20) NOT NULL,
  PRIMARY KEY (id_pessoa),
  CONSTRAINT UK_ok78slr6r5ngf4k31h4imrj4c UNIQUE(cns),
  CONSTRAINT UK_nljx0g14lqlph5yf0s2ds5fow UNIQUE(matricula),
  FOREIGN KEY (id_pessoa) REFERENCES public.tb_pessoa (id_pessoa)
); 

CREATE TABLE public.tb_funcionario (
  data_admissao datetime NOT NULL,
  matricula varchar(20) NOT NULL,
  id_pessoa bigint(20) NOT NULL,
  cargo_id bigint(20) NOT NULL,
  setor_id bigint(20) NOT NULL,
  PRIMARY KEY (id_pessoa),
  CONSTRAINT UK_bqn7bbsowmqv945cqwghqy2yy UNIQUE(matricula), 
  FOREIGN KEY (cargo_id) REFERENCES public.tb_cargo (id_cargo),
  FOREIGN KEY (id_pessoa) REFERENCES public.tb_pessoa (id_pessoa),
  FOREIGN KEY (setor_id) REFERENCES public.tb_setor (id_setor)
);

CREATE TABLE public.tb_medico (
  data_admissao datetime NOT NULL,
  especialidade varchar(60) NOT NULL,
  estado_registro varchar(50) NOT NULL,
  registro_profissional varchar(10) NOT NULL,
  tipo_registro varchar(70) NOT NULL,
  id_pessoa bigint(20) NOT NULL,
  cargo_id bigint(20) NOT NULL,
  setor_id bigint(20) NOT NULL,
  PRIMARY KEY (id_pessoa),
  CONSTRAINT UK_49unsh9cw676qsj4m91h134c5 UNIQUE(registro_profissional),
  FOREIGN KEY (cargo_id) REFERENCES public.tb_cargo (id_cargo),
  FOREIGN KEY (setor_id) REFERENCES public.tb_setor (id_setor),
  FOREIGN KEY (id_pessoa) REFERENCES public.tb_pessoa (id_pessoa)
);

CREATE TABLE public.tb_convenio (
  id_convenio bigint(20) NOT NULL AUTO_INCREMENT,
  nome_fantasia varchar(255) DEFAULT NULL,
  razao_social varchar(255) DEFAULT NULL,
  registro_ans varchar(255) DEFAULT NULL,
  PRIMARY KEY (id_convenio)
);

CREATE TABLE public.tb_convenio_medico (
  medico_id bigint(20) NOT NULL,
  convenio_id bigint(20) NOT NULL,
  PRIMARY KEY (medico_id,convenio_id),
  FOREIGN KEY (medico_id) REFERENCES public.tb_medico (id_pessoa),
  FOREIGN KEY (convenio_id) REFERENCES public.tb_convenio (id_convenio)
);

CREATE TABLE public.tb_agenda (
  id_agenda bigint(20) NOT NULL AUTO_INCREMENT,
  data_agendamento datetime NOT NULL,
  data_final_consulta datetime NOT NULL,
  data_inicial_consulta datetime NOT NULL,
  max_qtd_item_agenda int(11) DEFAULT NULL,
  PRIMARY KEY (id_agenda)
);

CREATE TABLE public.tb_item_agenda (
  id_item_agenda bigint(20) NOT NULL AUTO_INCREMENT,
  status_agenda varchar(30) DEFAULT NULL,
  tipo_agenda varchar(30) DEFAULT NULL,
  valor_consulta decimal(10,2) NOT NULL,
  id_agenda bigint(20) NOT NULL,
  medico_id bigint(20) NOT NULL,
  paciente_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id_item_agenda),
  FOREIGN KEY (id_agenda) REFERENCES public.tb_agenda (id_agenda),
  FOREIGN KEY (medico_id) REFERENCES public.tb_medico (id_pessoa),
  FOREIGN KEY (paciente_id) REFERENCES public.tb_paciente (id_pessoa)
);

CREATE TABLE public.tb_escala_atendimento (
  id_escala_atendimento bigint(20) NOT NULL AUTO_INCREMENT,
  data_modificacao datetime NOT NULL,
  id_escala_medico bigint(20) DEFAULT NULL,
  PRIMARY KEY (id_escala_atendimento),
  FOREIGN KEY (id_escala_medico) REFERENCES public.tb_medico (id_pessoa)
);

CREATE TABLE public.tb_item_escala_atendimento (
  id_item_escala_atendimento bigint(20) NOT NULL AUTO_INCREMENT,
  dia_semana varchar(30) NOT NULL,
  hora_entrada time NOT NULL,
  hora_saida time NOT NULL,
  hora_pausa_entrada time DEFAULT NULL,
  hora_pausa_termino time DEFAULT NULL,
  periodo varchar(20) NOT NULL,
  intervalo_agendamento bigint NOT NULL,
  quantidade_vagas bigint NOT NULL,
  tipo_atendimento varchar(30) NOT NULL,
  escala_atendimento_id bigint(20) NOT NULL,
  PRIMARY KEY (id_item_escala_atendimento),
  FOREIGN KEY (escala_atendimento_id) REFERENCES public.tb_escala_atendimento (id_escala_atendimento)
);