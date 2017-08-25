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
-- Table structure for table `tb_funcionario`
--

DROP TABLE IF EXISTS `tb_funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_funcionario` (
  `data_admissao` datetime NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `id_pessoa` bigint(20) NOT NULL,
  `cargo_id` bigint(20) NOT NULL,
  `setor_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE KEY `UK_bqn7bbsowmqv945cqwghqy2yy` (`matricula`),
  KEY `FK_43d9au5b8km80qexoe5vvge5g` (`cargo_id`),
  KEY `FK_e8b4os995itkginh6ydwxcdlu` (`setor_id`),
  CONSTRAINT `FK_88wvln8x2wh70v6xq5ig9bb4j` FOREIGN KEY (`id_pessoa`) REFERENCES `tb_pessoa` (`id_pessoa`),
  CONSTRAINT `FK_43d9au5b8km80qexoe5vvge5g` FOREIGN KEY (`cargo_id`) REFERENCES `tb_cargo` (`id_cargo`),
  CONSTRAINT `FK_e8b4os995itkginh6ydwxcdlu` FOREIGN KEY (`setor_id`) REFERENCES `tb_setor` (`id_setor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_funcionario`
--

LOCK TABLES `tb_funcionario` WRITE;
/*!40000 ALTER TABLE `tb_funcionario` DISABLE KEYS */;
INSERT INTO `tb_funcionario` VALUES ('2015-04-03 21:00:00','MGXK-1495552259621',1,1,1),('2017-05-22 21:00:00','MGXK-1496521573259',4,1,1),('2017-05-21 21:00:00','MGXK-1496521973987',5,3,4);
/*!40000 ALTER TABLE `tb_funcionario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-04 19:13:20
