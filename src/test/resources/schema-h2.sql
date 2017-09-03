drop table if exists public.tb_usuario;
 drop table if exists public.tb_permissao;
 drop table if exists public.tb_usuario_permissao;

 create table tb_permissao (
  pk_id bigint(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  role varchar(255) DEFAULT NULL
 );

create table public.tb_usuario (
  id  bigint(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email varchar(255) NOT NULL,
  nome varchar(80) NOT NULL,
  password varchar(128) NOT NULL,
  id_file_upload_pessoa bigint(20) DEFAULT NULL,
);

 create table public.tb_usuario_permissao (
  permissao_id bigint(20) NOT NULL,
  usuario_id bigint(20) NOT NULL,
  FOREIGN KEY (permissao_id) REFERENCES public.tb_permissao(pk_id),
  FOREIGN KEY (usuario_id) REFERENCES public.tb_usuario(id)
 );
