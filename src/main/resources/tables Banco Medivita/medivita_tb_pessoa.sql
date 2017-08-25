CREATE DATABASE  IF NOT EXISTS `medivita` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `medivita`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: medivita
-- ------------------------------------------------------
-- Server version	5.6.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_pessoa`
--

DROP TABLE IF EXISTS `tb_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_pessoa` (
  `tipo_pessoa` int(11) NOT NULL,
  `id_pessoa` bigint(20) NOT NULL AUTO_INCREMENT,
  `bairro` varchar(70) NOT NULL,
  `cep` varchar(150) NOT NULL,
  `cidade` varchar(70) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `data_nascimento` datetime NOT NULL,
  `estado` varchar(50) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `rg` varchar(15) NOT NULL,
  `rua` varchar(150) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE KEY `UK_n8mobknkuk6hwj7nqpfqgqx69` (`cpf`),
  UNIQUE KEY `UK_l584y750sna251pduax7nmrp4` (`rg`),
  KEY `FK_7osm78hv7np0tyubqsr96lssj` (`user_id`),
  CONSTRAINT `FK_7osm78hv7np0tyubqsr96lssj` FOREIGN KEY (`user_id`) REFERENCES `tb_usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_pessoa`
--

LOCK TABLES `tb_pessoa` WRITE;
/*!40000 ALTER TABLE `tb_pessoa` DISABLE KEYS */;
INSERT INTO `tb_pessoa` VALUES (2,1,'Custódio Pereira','38405250','Uberlândia','12901833411','2018-04-03 21:00:00','MG','12315','55.132.131-3','Rua Ciro de Castro Almeida','Masculino','Ativo','34645465465',1),(3,2,'Custódio Pereira','38405211','Uberlândia','51542248418','2008-02-05 22:00:00','MG','1234','12.312.341-2','Rua Novo Sol','Feminino','Ativo','21341234123',5),(3,3,'Custódio Pereira','38405211','Uberlândia','34677541477','2006-12-31 22:00:00','MG','3215','34.343.333-3','Rua Novo Sol','Masculino','Ativo','32165465466',6),(2,4,'Custódio Pereira','38405211','Uberlândia','42677647192','2008-04-02 21:00:00','MG','154','34.234.213-4','Rua Novo Sol','Masculino','Ativo','35889879879',7),(2,5,'Custódio Pereira','38405211','Uberlândia','81773446843','2003-02-03 22:00:00','MG','1547','23.412.341-3','Rua Novo Sol','Feminino','Ativo','32132132132',8),(1,6,'Custódio Pereira','38405211','Uberlândia','97773115591','2002-02-04 22:00:00','MG','157','12.344.123-4','Rua Novo Sol','Masculino','Ativo','12341234123',9),(1,7,'Custódio Pereira','38405211','Uberlândia','81244896616','1996-02-01 22:00:00','MG','9878','13.412.341-2','Rua Novo Sol','Feminino','Ativo','32165465465',11);
/*!40000 ALTER TABLE `tb_pessoa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-04 19:13:21
