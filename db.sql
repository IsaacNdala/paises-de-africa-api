-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: paisesAfrica
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `colonia`
--

DROP TABLE IF EXISTS `colonia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `colonia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colonia`
--

LOCK TABLES `colonia` WRITE;
/*!40000 ALTER TABLE `colonia` DISABLE KEYS */;
INSERT INTO `colonia` VALUES (1,'Portugal','2023-05-15 10:35:38','2023-05-15 10:35:38'),(2,'França','2023-05-15 10:35:55','2023-05-15 10:35:55'),(3,'Inglaterra','2023-05-15 10:36:09','2023-05-15 10:36:09'),(4,'Espanha','2023-05-15 10:37:16','2023-05-15 10:37:16'),(5,'Itália','2023-05-15 10:37:28','2023-05-15 10:37:28');
/*!40000 ALTER TABLE `colonia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `capital` varchar(255) NOT NULL,
  `moeda` varchar(255) NOT NULL,
  `linguaOficial` varchar(255) NOT NULL,
  `presidente` varchar(255) NOT NULL,
  `dataIndependencia` varchar(255) NOT NULL,
  `imagemBandeiraURL` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `regiaoId` int(11) DEFAULT NULL,
  `coloniaId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `regiaoId` (`regiaoId`),
  KEY `coloniaId` (`coloniaId`),
  KEY `userId` (`userId`),
  CONSTRAINT `pais_ibfk_1` FOREIGN KEY (`regiaoId`) REFERENCES `regiaos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pais_ibfk_2` FOREIGN KEY (`coloniaId`) REFERENCES `colonia` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pais_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Angola','Luanda','Kwanza (kz)','Português','João Lourenço','1975-11-11','images/pa_fb097b30571e4a05610bd6bd.png','2023-05-15 10:45:13','2023-05-15 10:45:13',1,1,1),(2,'Nigéria','Abuja','Naira (₦)','Inglês','Muhammadu Buhari','1960-10-01','images/pa_58aff7554404c8b718137dd8.png','2023-05-15 10:53:11','2023-05-15 10:53:11',4,3,1),(3,'Senegal','Dakar','CFA franc (XOF)','Francês','Macky Sall','1960-04-04','images/pa_26e10daddc9134064078e1a1.png','2023-05-15 10:56:19','2023-05-15 10:56:19',2,2,1);
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pratoTipicos`
--

DROP TABLE IF EXISTS `pratoTipicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pratoTipicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `idPais` varchar(255) DEFAULT NULL,
  `imagemURL` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paisId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paisId` (`paisId`),
  CONSTRAINT `pratotipicos_ibfk_1` FOREIGN KEY (`paisId`) REFERENCES `pais` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pratoTipicos`
--

LOCK TABLES `pratoTipicos` WRITE;
/*!40000 ALTER TABLE `pratoTipicos` DISABLE KEYS */;
INSERT INTO `pratoTipicos` VALUES (2,'Calulu',NULL,'images/pa_4d71c7123d2f135b3a4e097d.jpeg','1','2023-05-15 18:36:57','2023-05-15 18:36:57',1);
/*!40000 ALTER TABLE `pratoTipicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regiaos`
--

DROP TABLE IF EXISTS `regiaos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `regiaos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regiaos`
--

LOCK TABLES `regiaos` WRITE;
/*!40000 ALTER TABLE `regiaos` DISABLE KEYS */;
INSERT INTO `regiaos` VALUES (1,'África Subsariana','2023-05-09 23:21:29','2023-05-09 23:21:29'),(2,'África Ocidental','2023-05-13 14:55:01','2023-05-13 15:49:14'),(3,'África Central','2023-05-13 15:46:10','2023-05-13 15:46:10'),(4,'Este de África','2023-05-13 15:46:23','2023-05-13 15:46:23'),(5,'Norte de África','2023-05-13 15:46:33','2023-05-13 15:46:33');
/*!40000 ALTER TABLE `regiaos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `sobreNome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fotoURL` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Isaac','Ndala','isaacndala@gmail.com','$2a$12$z2.3eBe1QW9kvlUl/Djb/.0ofAskfeqNEJRZyF/XQ7uiM1wrsIXdK','images/pa_0d6bbe5c4b8507d030253925.jpeg','2023-05-13 17:37:47','2023-05-13 17:37:47'),(2,'Marecelino','Saquende','marcelinosaquende@gmail.com','$2a$12$0ke/WtyAZ3XMG.YY2A.M/ubByJ/v2UumP9QtP00APw73XIibuWG1u','images/pa_8eba2c6901173106b2ced992.png','2023-05-15 18:23:19','2023-05-15 18:23:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-15 21:44:15
