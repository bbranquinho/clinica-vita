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
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paciente` (
  `cns` varchar(20) NOT NULL,
  `escolaridade` varchar(80) NOT NULL,
  `estado_civil` varchar(15) NOT NULL,
  `etnia` varchar(15) NOT NULL,
  `fator_sanguineo` varchar(4) NOT NULL,
  `hobbie` varchar(25) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `nome_conjuge` varchar(80) NOT NULL,
  `nome_mae` varchar(80) NOT NULL,
  `nome_pai` varchar(80) NOT NULL,
  `profissao` varchar(30) NOT NULL,
  `id_pessoa` bigint(20) NOT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE KEY `UK_ok78slr6r5ngf4k31h4imrj4c` (`cns`),
  UNIQUE KEY `UK_nljx0g14lqlph5yf0s2ds5fow` (`matricula`),
  CONSTRAINT `FK_fc1j6r97k5pwb3joeobrwjcxo` FOREIGN KEY (`id_pessoa`) REFERENCES `tb_pessoa` (`id_pessoa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES ('12341234','Ensino Superior','Casado','Branca','O+','Caminhar','MGXK-1496527952738','Ana Silva','Maria Silva','Jose Silva','Motorista',6),('23452134','Ensino Superior','Separado','Branca','O+','Natação','MGXK-1496528517707','Mateus Silva','Maria Silva','Jose Silva','Aposentada',7);
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-04 19:13:19
