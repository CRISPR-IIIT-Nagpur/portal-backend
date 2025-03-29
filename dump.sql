-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: portal
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `network_employees`
--

DROP TABLE IF EXISTS `network_employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `network_employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `post` varchar(100) NOT NULL,
  `ongoing` int DEFAULT '0',
  `resolved` int DEFAULT '0',
  `total` int GENERATED ALWAYS AS ((`ongoing` + `resolved`)) STORED,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `network_employees`
--

LOCK TABLES `network_employees` WRITE;
/*!40000 ALTER TABLE `network_employees` DISABLE KEYS */;
INSERT INTO `network_employees` (`id`, `name`, `post`, `ongoing`, `resolved`) VALUES (1,'Dharampal','LAN Wale Bhaiya',2,5);
/*!40000 ALTER TABLE `network_employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `network_issues`
--

DROP TABLE IF EXISTS `network_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `network_issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `place` varchar(100) NOT NULL,
  `floor` varchar(10) DEFAULT NULL,
  `network_type` varchar(50) NOT NULL,
  `issue` varchar(100) NOT NULL,
  `description` text,
  `assigned_to` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `reported_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `roomNo` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `network_issues`
--

LOCK TABLES `network_issues` WRITE;
/*!40000 ALTER TABLE `network_issues` DISABLE KEYS */;
INSERT INTO `network_issues` VALUES (1,'hostel','G','WiFi','Speed Issue','hello','Dharampal','Completed','2025-03-29 03:06:47','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','G9'),(2,'hostel','G','lan','portDamage','hello again','Dharampal','Completed','2025-03-29 04:00:02','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','G9'),(3,'hostel','4','lan','portDamage','test complaint 3 ','Dharampal','Completed','2025-03-29 04:06:23','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','48'),(4,'academic','3','WiFi','forgotPassword','hello 4 ','Dharampal','Completed','2025-03-29 04:17:23','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','34'),(5,'hostel','4','lan','','lan nahi chal raha ','Dharampal','Assigned','2025-03-29 07:35:34','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','415'),(6,'hostel','G','WiFi','connection','vhvhjhvl','Dharampal','Assigned','2025-03-29 07:36:20','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','566'),(7,'hostel','1','lan','','hjgvhjg','Dharampal','Assigned','2025-03-29 07:36:33','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','69'),(8,'hostel','G','lan','portDamage','iouiog',NULL,'Pending','2025-03-29 07:36:45','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','86896'),(9,'hostel','G','WiFi','Speed Issue','utuiti',NULL,'Pending','2025-03-29 07:37:28','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','87978587'),(10,'hostel','3','lan','','iuyuitg',NULL,'Pending','2025-03-29 07:37:37','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','8976897'),(11,'hostel','7','lan','Speed Issue','ui8tyuig',NULL,'Pending','2025-03-29 07:38:44','Jaivardhan Bhola','bt23cse176@iiitn.ac.in','740');
/*!40000 ALTER TABLE `network_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jaivardhan Bhola','bt23cse176@iiitn.ac.in','2896ce901c2eaec88a0046dd8b2104d239651a9f75432e3834a9f5b5fa1a0aa1','student','2025-03-29 03:30:33'),(2,'Test Admin','admin','937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244','admin','2025-03-29 05:07:42'),(3,'Dharampal','dharampalNetwork@iiitn.ac.in','e9cee71ab932fde863338d08be4de9dfe39ea049bdafb342ce659ec5450b69ae','employee','2025-03-29 07:28:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `websites`
--

DROP TABLE IF EXISTS `websites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `websites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `purpose` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `websites`
--

LOCK TABLES `websites` WRITE;
/*!40000 ALTER TABLE `websites` DISABLE KEYS */;
INSERT INTO `websites` VALUES (1,'Jaivardhan Bhola','https://www.digitalocean.com','Docs','2025-03-29 05:03:04');
/*!40000 ALTER TABLE `websites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-29 14:18:39
