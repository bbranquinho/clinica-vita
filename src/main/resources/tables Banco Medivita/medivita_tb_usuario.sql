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
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `password` varchar(128) NOT NULL,
  `id_file_upload_pessoa` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_spmnyb4dsul95fjmr5kmdmvub` (`email`),
  KEY `FK_icb0mibx1tqvqr7cb1b2gvj7f` (`id_file_upload_pessoa`),
  CONSTRAINT `FK_icb0mibx1tqvqr7cb1b2gvj7f` FOREIGN KEY (`id_file_upload_pessoa`) REFERENCES `tb_file_upload` (`id_file_upload`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` VALUES (1,'admin@admin.com','Administradors','9fe76e18dd29100230680fa6c812e26c4da4b3cf48a85850910e6f4400a6b3ff9ec05190c175f592',NULL),(5,'manoela@manoela.com','Manoela Silvas','32c88457c84d9b524f1394951819690225359c5ee7dd4d7515689fdf3a50e8606b091aa7406ab9fa',1),(6,'joao@joao.com','Joao das Couves','b6a2e6e934873b33a385c54c64205193dcf96c564c692db205ef949b5424c64578a9a42717e89bb9',2),(7,'pedro@pedro.com','Pedro das Couves','5064c6320751e83272176d2d1b9ecb0efafea125a87d83b6ba82a1e9d766730ef5af968ee7d0480f',3),(8,'maria@maria.com','Maria das couves','6ece1bcdd70fdf4881fac91d1a9afd76b819df44e738187bfed9affcc3b920be16e1571e71c7d4dc',4),(9,'carlos@carlos.com','Carlos das Couves','0cb89cb2b4369e8ad878faaf4b16923d20766f57e72210fe3d45d34744d2e456eb523e459f39f151',5),(11,'julia@julia.com','Julia das Couves','aedd3e3ba16d1ab705ae2f1b6dd77ec2c7ef41a0ec4a672b85bf4a421401d978e348259e955a1341',7);
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
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
