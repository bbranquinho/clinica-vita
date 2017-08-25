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
-- Table structure for table `tb_medico`
--

DROP TABLE IF EXISTS `tb_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_medico` (
  `data_admissao` datetime NOT NULL,
  `especialidade` varchar(60) NOT NULL,
  `estado_registro` varchar(50) NOT NULL,
  `registro_profissional` varchar(10) NOT NULL,
  `tipo_registro` varchar(70) NOT NULL,
  `id_pessoa` bigint(20) NOT NULL,
  `cargo_id` bigint(20) NOT NULL,
  `setor_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE KEY `UK_49unsh9cw676qsj4m91h134c5` (`registro_profissional`),
  KEY `FK_l1ks5mx90job068jd90m7gn4y` (`cargo_id`),
  KEY `FK_qepsehoqv02qnufbclxphf3sq` (`setor_id`),
  CONSTRAINT `FK_t6f9bgv9j8kn63pnjrasvgtng` FOREIGN KEY (`id_pessoa`) REFERENCES `tb_pessoa` (`id_pessoa`),
  CONSTRAINT `FK_l1ks5mx90job068jd90m7gn4y` FOREIGN KEY (`cargo_id`) REFERENCES `tb_cargo` (`id_cargo`),
  CONSTRAINT `FK_qepsehoqv02qnufbclxphf3sq` FOREIGN KEY (`setor_id`) REFERENCES `tb_setor` (`id_setor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_medico`
--

LOCK TABLES `tb_medico` WRITE;
/*!40000 ALTER TABLE `tb_medico` DISABLE KEYS */;
INSERT INTO `tb_medico` VALUES ('2017-05-30 21:00:00','Pediatria','Amazonas','23452345','CRF',2,1,1),('2017-05-29 21:00:00','Clinico Geral','Alagoas','12341234','CRF',3,2,2);
/*!40000 ALTER TABLE `tb_medico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-04 19:13:23
