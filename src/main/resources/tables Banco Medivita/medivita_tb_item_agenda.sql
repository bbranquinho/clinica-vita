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
-- Table structure for table `tb_item_agenda`
--

DROP TABLE IF EXISTS `tb_item_agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_item_agenda` (
  `id_item_agenda` bigint(20) NOT NULL AUTO_INCREMENT,
  `status_agenda` varchar(15) NOT NULL,
  `tipo_agenda` varchar(15) NOT NULL,
  `valor_consulta` decimal(10,2) NOT NULL,
  `id_agenda` bigint(20) NOT NULL,
  `medico_id` bigint(20) NOT NULL,
  `paciente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_item_agenda`),
  KEY `FK_287levrsd2cj520arbtdn6ali` (`id_agenda`),
  KEY `FK_7cv4e4hyxjj8tk4mkvyp9o9s1` (`medico_id`),
  KEY `FK_f4m8fygq35i5m5c0vtvbeta3x` (`paciente_id`),
  CONSTRAINT `FK_f4m8fygq35i5m5c0vtvbeta3x` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id_pessoa`),
  CONSTRAINT `FK_287levrsd2cj520arbtdn6ali` FOREIGN KEY (`id_agenda`) REFERENCES `tb_agenda` (`id_agenda`),
  CONSTRAINT `FK_7cv4e4hyxjj8tk4mkvyp9o9s1` FOREIGN KEY (`medico_id`) REFERENCES `tb_medico` (`id_pessoa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_item_agenda`
--

LOCK TABLES `tb_item_agenda` WRITE;
/*!40000 ALTER TABLE `tb_item_agenda` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_item_agenda` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-04 19:13:22
