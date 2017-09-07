INSERT INTO `tb_usuario` VALUES (1,'admin@admin.com','Administrador','9fe76e18dd29100230680fa6c812e26c4da4b3cf48a85850910e6f4400a6b3ff9ec05190c175f592',NULL),(5,'manoela@manoela.com','Manoela Silvas','32c88457c84d9b524f1394951819690225359c5ee7dd4d7515689fdf3a50e8606b091aa7406ab9fa',NULL),(6,'joao@joao.com','Joao das Couves','b6a2e6e934873b33a385c54c64205193dcf96c564c692db205ef949b5424c64578a9a42717e89bb9',NULL),(7,'pedro@pedro.com','Pedro das Couves','5064c6320751e83272176d2d1b9ecb0efafea125a87d83b6ba82a1e9d766730ef5af968ee7d0480f',NULL),(8,'maria@maria.com','Maria das couves','6ece1bcdd70fdf4881fac91d1a9afd76b819df44e738187bfed9affcc3b920be16e1571e71c7d4dc',NULL),(9,'carlos@carlos.com','Carlos das Couves','0cb89cb2b4369e8ad878faaf4b16923d20766f57e72210fe3d45d34744d2e456eb523e459f39f151',NULL),(11,'julia@julia.com','Julia das Couvess','aedd3e3ba16d1ab705ae2f1b6dd77ec2c7ef41a0ec4a672b85bf4a421401d978e348259e955a1341',NULL),(12,'carina@carina.com','Carina Silva Duartee','2341ace99dcb2a17be46d59ec5952e897e4ad12906efec269c52d169d009511d61339954806f4df7',NULL);

INSERT INTO `tb_permissao` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_MEDICO'),(3,'ROLE_PACIENTE'),(4,'ROLE_FUNCIONARIO'),(5,'ROLE_SECRETARIA');

INSERT INTO `tb_usuario_permissao` VALUES (1,1),(2,5),(2,6),(4,8),(3,9),(3,11),(5,12);

INSERT INTO `tb_pessoa` VALUES (2,1,'Custódio Pereira','38405250','Uberlândia','12901833411','2018-04-03 21:00:00','MG','12315','55.132.131-3','Rua Ciro de Castro Almeida','Masculino','Ativo','34645465465',1),(3,2,'Custódio Pereira','38405211','Uberlândia','51542248418','2008-02-05 22:00:00','MG','1234','12.312.341-2','Rua Novo Sol','Feminino','Ativo','21341234123',5),(3,3,'Custódio Pereira','38405211','Uberlândia','34677541477','2006-12-31 22:00:00','MG','3215','34.343.333-3','Rua Novo Sol','Masculino','Ativo','32165465466',6),(2,4,'Custódio Pereira','38405211','Uberlândia','42677647192','2008-04-02 21:00:00','MG','154','34.234.213-4','Rua Novo Sol','Masculino','Ativo','35889879879',7),(2,5,'Custódio Pereira','38405211','Uberlândia','81773446843','2003-02-03 22:00:00','MG','1547','23.412.341-3','Rua Novo Sol','Feminino','Ativo','32132132132',8),(1,6,'Custódio Pereira','38405211','Uberlândia','97773115591','2002-02-04 22:00:00','MG','157','12.344.123-4','Rua Novo Sol','Masculino','Ativo','12341234123',9),(1,7,'Custódio Pereira','38405211','Uberlândia','81244896616','1996-02-01 22:00:00','MG','9878','13.412.341-2','Rua Novo Sol','Feminino','Ativo','32165465465',11),(2,8,'Custódio Pereira','38405211','Uberlândia','21548577367','2008-01-01 22:00:00','MG','123','33.434.343-4','Rua Novo Sol','Feminino','Ativo','34654654646',12);

INSERT INTO `tb_cargo` VALUES (1,'Desc TI','Gerente TI'),(2,'Desc Médico','Médico'),(3,'Desc Secretária','Secretárias'),(4,'Desc Tercerizado','Tercerizado'),(5,'Desc Terc2','Tercerizados2'),(6,'Desc Tercerizado3','Tercerizado 3'),(7,'Desc Tercerizado4','Tercerizado4');

INSERT INTO `tb_setor` VALUES (1,'Desc TI','Ti'),(2,'Desc Cirurgia','Cirurgia'),(4,'Desc Adminstração','Adminstração'),(7,'Desc Financeiro','Financeiros'),(10,'Desc Gerencia','Gerencia'),(11,'Desc Gerencia 2','Gerencia 2');

INSERT INTO `tb_paciente` VALUES ('12341234','Ensino Superior','Casado','Branca','O+','Caminhar','MGXK-1496527952738','Ana Silva','Maria Silva','Jose Silva','Motorista',6),('23452134','Ensino Superior','Separado','Branca','O+','Natação','MGXK-1496528517707','Mateus Silva','Maria Silva','Jose Silva','Aposentada',7);

INSERT INTO `tb_funcionario` VALUES ('2015-04-03 21:00:00','MGXK-1495552259621',1,1,1),('2017-05-22 21:00:00','MGXK-1496521573259',4,1,1),('2017-05-21 21:00:00','MGXK-1496521973987',5,3,4),('2017-05-02 21:00:00','MGXK-1496853241823',8,1,1);

INSERT INTO `tb_medico` VALUES ('2017-05-30 21:00:00','Pediatria','Amazonas','23452345','CRF',2,1,1),('2017-05-29 21:00:00','Clinico Geral','Alagoas','12341234','CRF',3,2,2);

INSERT INTO `tb_convenio` VALUES (1,'ODONTOREAL','A S ASSISTENCIA','413763'),(2,'UNOESTE SAÚDE','AASSOP - A','416738'),(3,'ABBESS - ASSOCIAÇÃO BRASILEIRA','ABBESS - A','417734'),(4,'ABC ASSISTENCIAL','ABC ASSIST','417408'),(5,'ABS ASSISTÊNCIA BUCAL SERVIÇOS','ABS-ASSISTÊNCIA BUCAL SERVIÇOS S/C LTDA.','306347');

INSERT INTO `tb_convenio_medico` VALUES (2,2),(3,2),(2,3),(3,4);

INSERT INTO `tb_agenda` VALUES (1,'2017-06-09 00:00:00','2017-05-28 16:30:00','2017-05-28 15:30:00',NULL),(2,'2017-06-09 00:00:00','2017-05-27 16:30:00','2017-05-27 15:30:00',NULL),(3,'2017-06-09 00:00:00','2017-06-13 15:30:00','2017-06-13 14:20:00',NULL),(4,'2017-06-09 00:00:00','2017-06-15 11:30:00','2017-06-15 10:20:00',NULL),(5,'2017-06-09 00:00:00','2017-06-15 10:10:00','2017-06-15 09:00:00',NULL),(6,'2017-06-09 00:00:00','2017-06-21 02:30:00','2017-06-21 01:10:00',NULL),(7,'2017-06-09 00:00:00','2017-06-12 06:05:00','2017-06-12 05:05:00',NULL),(8,'2017-06-29 00:00:00','2017-06-30 11:50:00','2017-06-30 10:30:00',NULL),(9,'2017-06-29 00:00:00','2017-06-30 12:30:00','2017-06-30 11:30:00',NULL),(10,'2017-06-29 00:00:00','2017-06-30 13:30:00','2017-06-30 12:30:00',NULL),(11,'2017-06-29 00:00:00','2017-06-30 14:30:00','2017-06-30 13:30:00',NULL),(12,'2017-06-29 00:00:00','2017-07-01 11:30:00','2017-07-01 10:30:00',NULL),(13,'2017-06-29 00:00:00','2017-06-30 11:30:00','2017-06-30 10:30:00',NULL),(14,'2017-06-29 00:00:00','2017-07-02 11:30:00','2017-07-02 10:30:00',NULL),(15,'2017-06-29 00:00:00','2017-07-02 12:30:00','2017-07-02 11:30:00',NULL),(16,'2017-06-29 00:00:00','2017-07-02 13:30:00','2017-07-02 12:30:00',NULL),(17,'2017-06-29 00:00:00','2017-07-02 14:30:00','2017-07-02 13:30:00',NULL),(18,'2017-08-22 00:00:00','2017-08-23 11:30:00','2017-08-23 10:30:00',NULL),(19,'2017-08-23 00:00:00','2017-08-26 11:30:00','2017-08-26 10:30:00',NULL),(20,'2017-08-31 00:00:00','2017-09-01 11:30:00','2017-09-01 10:30:00',NULL),(21,'2017-08-31 00:00:00','2017-09-01 11:30:00','2017-09-01 10:30:00',NULL);

INSERT INTO `tb_item_agenda` VALUES (1,'Não-agendado','Consulta',50.00,1,3,NULL),(2,'Não-agendado','Consulta',15.00,2,3,NULL),(3,'Não-agendado','Consulta',20.00,3,3,NULL),(4,'Não-agendado','Consulta',30.00,4,3,NULL),(5,'Não-agendado','Exame',40.00,5,3,NULL),(6,'Não-agendado','Consulta',40.00,6,3,NULL),(7,'Não-agendado','Pré-natal',30.00,7,3,NULL),(8,'Não-autorizado','Consulta',50.00,8,3,7),(9,'Não-autorizado','Consulta',60.00,9,3,6),(10,'Não-autorizado','Consulta',90.00,10,3,6),(11,'Não-autorizado','Consulta',40.00,11,3,7),(12,'Não-autorizado','Consulta',40.00,12,3,7),(13,'Não-agendado','Consulta',60.00,13,2,NULL),(14,'Não-autorizado','Consulta',40.00,14,3,7),(15,'Não-autorizado','Consulta',60.00,15,3,7),(16,'Não-autorizado','Consulta',10.00,16,3,7),(17,'Não-agendado','Consulta',60.00,17,3,NULL),(18,'Não-agendado','Encaixe',50.00,18,3,NULL),(19,'Não-agendado','Consulta',50.00,19,3,NULL),(20,'Disponivel','Consulta',50.00,20,3,NULL),(21,'Disponivel','Consulta',50.00,21,3,NULL);

INSERT INTO `tb_escala_atendimento` VALUES (1,'2017-07-09 00:00:00',2);

INSERT INTO `tb_item_escala_atendimento` VALUES (1,'Segunda-Feira','08:00:00','18:00:00','12:00:00','13:00:00','manhã/tarde',30,3,'Agendamento',1),(2,'Terça-Feira','08:00:00','18:00:00','12:00:00','13:00:00','manhã/tarde',30,3,'Agendamento',1);