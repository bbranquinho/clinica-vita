SELECT * FROM medivita.tb_usuario;

INSERT INTO `medivita`.`tb_usuario` (`id`, `email`, `nome`, `password`, `id_file_upload_pessoa`) VALUES ('1', 'admin@admin.com', 'Administrador','9fe76e18dd29100230680fa6c812e26c4da4b3cf48a85850910e6f4400a6b3ff9ec05190c175f592', null);

INSERT INTO `medivita`.`tb_permissao` (`pk_id`, `role`) VALUES (1, 'ROLE_ADMIN');
INSERT INTO `medivita`.`tb_permissao` (`pk_id`, `role`) VALUES (2, 'ROLE_MEDICO');
INSERT INTO `medivita`.`tb_permissao` (`pk_id`, `role`) VALUES (3, 'ROLE_PACIENTE');


INSERT INTO `medivita`.`tb_usuario_permissao` (`permissao_id`, `usuario_id`) VALUES ('1', '1');

INSERT INTO `medivita`.`tb_setor` (`id_setor`,`nome`,`descricao`) VALUES (2, 'Cirurgia','Desc Cirurgia');
INSERT INTO `medivita`.`tb_cargo` (`id_cargo`,`nome` ,`descricao`) VALUES (2, 'Médico','Desc Médico');
INSERT INTO `medivita`.`tb_setor` (`id_setor`,`nome`, `descricao`) VALUES (1, 'Ti','Desc TI');
INSERT INTO `medivita`.`tb_cargo` (`id_cargo`,`nome` ,`descricao`) VALUES (1, 'Gerente TI','Desc TI');

INSERT INTO `medivita`.`tb_pessoa` (`tipo_pessoa`, `id_pessoa`, `bairro`, `cep`, `cidade`, `cpf`, `data_nascimento`, `estado`, `numero`, `rg`, `rua`, `sexo`, `status`, `telefone`, `user_id`) 
VALUES (2, 1, 'Custódio Pereira', '38405250', 'Uberlândia', '12901833411', '2018-04-03 21:00:00', 'MG', '12315', '55.132.131-3', 'Rua Ciro de Castro Almeida', 'Masculino', 'Ativo', '34645465465', 1);

INSERT INTO `medivita`.`tb_funcionario`(`data_admissao`,`id_pessoa`,`cargo_id`,`setor_id`,`matricula`)
VALUES ('2015-04-03 21:00:00', 1, 1, 1, 'MGXK-1495552259621');


create database medivita;

select * from `medivita`.`tb_usuario_permissao`;
select * from `medivita`.`tb_usuario`;
select * from `medivita`.`tb_permissao`;
select * from `medivita`.`tb_pessoa`;
select * from `medivita`.`tb_funcionario`;
select * from `medivita`.`tb_cargo`;




desc tb_pessoa;