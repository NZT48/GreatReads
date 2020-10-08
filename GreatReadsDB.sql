CREATE DATABASE  IF NOT EXISTS `GreatReadsDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `GreatReadsDB`;
-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: GreatReadsDB
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20200805193057-create-user.js'),('20200810152317-create-waiting.js'),('20200811154809-create-resetpass.js'),('20200811184333-create-book.js'),('20200813183724-create-genres.js'),('20200822231843-create-events.js'),('20200824125903-create-comments.js'),('20200824222144-create-readings.js'),('20200825163726-create-followings.js'),('20200826135404-create-notifications.js'),('20200827172702-create-event-post.js'),('20200827172748-create-user-in-event.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `last_active` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Petar','Petrovic','pera@mail.com','Pera123!',3,'Berlin','Germany','Pera','e4ktcc1598357304596.jpg','2020-08-08 17:57:46',0,'2020-09-19 18:58:34','2020-08-08 17:57:46','2020-09-19 16:58:34'),(2,'Jovan','Jovanovic','jovan@mail.com','Admin123',3,'Belgrade','Serbia','Admin','','1992-08-10 00:00:00',0,'2020-08-08 17:57:46','2020-08-08 17:57:46','2020-08-08 17:57:46'),(3,'Marko','Markovic','marko@mail.com','Mare123!',2,'Novi Sad','Serbia','Mare','','2019-10-23 00:00:00',0,'2020-08-27 22:06:33','2020-08-10 16:14:03','2020-08-27 20:06:33'),(4,'Milos','Milosevic','milos@mail.com','Misa123!',1,'Paris','France','Misa','','1987-05-14 00:00:00',0,'2020-08-08 17:57:46','2020-08-10 16:43:41','2020-08-10 16:43:41'),(5,'Milica','Milic','milica@mail.com','Mica123!',1,'London','UK','Mica','46h5k1597589856862.jpg','1988-08-03 00:00:00',0,'2020-09-19 20:06:57','2020-08-10 16:47:09','2020-09-19 18:06:57'),(6,'Nina','Ninkovic','nina@mail.com','Nina123!',1,'Brisel','Belgium','Nini','','2020-08-24 00:00:00',0,'2020-08-08 17:57:46','2020-08-10 16:49:31','2020-08-10 16:49:31'),(7,'Stefan','Stefanovic','stefan@mail.com','Stefi123!',2,'Zagreb','Croatia','Stefi','','1976-08-03 00:00:00',0,'2020-08-30 16:02:29','2020-08-10 19:20:39','2020-08-30 14:02:29'),(8,'Milovan','Milovanovic','milovan@mail.com','Mile123!',1,'Subotica','Serbia','Mile','','2020-08-21 00:00:00',0,'2020-08-30 22:20:34','2020-08-11 11:56:15','2020-08-30 20:20:34'),(9,'Nikola','Todorovic','nikolaztodorovic26@gmail.com','Dzoni123!',2,'Belgrade','Serbia','Dzoni','1jjas3285142984.jpeg','2020-08-02 00:00:00',1,'2020-09-19 20:38:05','2020-08-11 13:17:04','2020-09-19 18:39:11'),(10,'Janko','Jankovic','janko@mail.com','Jane123!',1,'Uzice','Serbia','Jane','','2020-08-04 00:00:00',0,'2020-08-30 16:21:20','2020-08-16 13:10:24','2020-08-30 14:21:20'),(11,'Jasmina','Jasminovic','jasmina@mail.com','Jasmin123!',1,'New York','USA','Jasmin','','2020-07-29 00:00:00',0,'2020-08-08 17:57:46','2020-08-16 14:59:50','2020-08-16 14:59:50'),(12,'Mirko','Mirkovic','mirko@mail.com','Mire123!',1,'London','UK','Mire','','1977-11-12 00:00:00',0,'2020-08-30 22:45:14','2020-08-16 15:30:07','2020-08-30 20:45:14');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Waitings`
--

DROP TABLE IF EXISTS `Waitings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Waitings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Waitings`
--

LOCK TABLES `Waitings` WRITE;
/*!40000 ALTER TABLE `Waitings` DISABLE KEYS */;
INSERT INTO `Waitings` VALUES (6,'Nevena','Nevenic','nena@mail.com','Nena123!',1,'Uzice','Srbija','Nena','','1965-02-20 00:00:00','2020-08-30 19:54:20','2020-08-30 19:54:20'),(7,'Marija','Maric','mara@mail.com','Mara123!',1,'Bucharest','Romania','Mara','','2020-08-03 00:00:00','2020-08-30 20:35:42','2020-08-30 20:35:42');
/*!40000 ALTER TABLE `Waitings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `authors` varchar(255) DEFAULT NULL,
  `published` datetime DEFAULT NULL,
  `genres` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Luca Mikrokozma','Petar Petrovic Njegos','2020-08-10 16:43:41','Memoir, History','Prvo izdanje je objavljeno u Beogradu, 1845.','',6,1,'2020-08-10 16:43:41','2020-09-19 18:06:40',''),(2,'Stranac','Alber Kami','2020-08-10 16:43:41','Drama','Veoma poznata knjiga','',8,1,'2020-08-10 16:43:41','2020-08-26 14:28:07',''),(3,'Tunel','Ernesto Sabato','2020-08-10 16:43:41','Drama, Mystery','Veoma poznata knjiga argentinskog pisca','',2.224,1,'2020-08-10 16:43:41','2020-08-10 16:43:41',''),(4,'Black Swan','Nasim Taleb','2016-08-09 00:00:00','Economy, Biography, Memoir','Book about rare events in economy','',7.75,1,'2020-08-13 13:38:55','2020-08-24 19:22:56',''),(5,'Primenjena Kriptografija','Brus Snajer','2019-10-23 00:00:00','IT','Knjiga o kriptografiji','',8,1,'2020-08-13 13:40:50','2020-09-19 17:59:41',''),(6,'Veliki Getsbi','Fitzgerald','1956-08-11 00:00:00','Drama, Mystery','The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald\n','949pb1597593706032.jpg',7.5,1,'2020-08-16 16:01:47','2020-08-30 19:03:37',''),(7,'War and Peace','Leo Tolstoy','1915-08-05 00:00:00','Drama, History','It is regarded as one of Tolstoy\'s finest literary achievements and remains a classic of world literature','',10,1,'2020-08-24 20:54:08','2020-08-25 16:07:00',''),(8,'A clockwork orange','Anthony Burgess','1978-12-04 00:00:00','Science fiction, Thriller, Mystery','A Clockwork Orange is a dystopian satirical black comedy novel by English writer Anthony Burgess, published in 1962. It is set in a near-future society that has a youth subculture of extreme violence.','zeknj1598527899530.jpg',0,0,'2020-08-27 11:32:41','2020-08-27 11:32:41',''),(9,'Kockar','Fjodor Dostojevski','1915-08-05 00:00:00','Drama, History','Jedno od najpoznatijih dela cuvenog ruskog pisca','',0,0,'2020-08-24 20:54:08','2020-08-24 20:54:08',''),(10,'Autostoperski vodic kroz galaksiju','Daglas Adams','2019-10-23 00:00:00','Science fiction, Thriller, Drama','Jedna od najpopularnijih i najčitanijih SF knjiga svih vremena!','',0,1,'2020-08-16 16:01:47','2020-08-16 16:01:47',''),(12,'U potrazi za Fibonacijem','Kit Devlin','2014-07-22 00:00:00','Memoir, Drama, Biography','U to vreme, na samom početku svoje karijere, o Fibonačiju sam jedino znao da je on matematičar koji je otkrio čuveni, po njemu nazvan, Fibonačijev niz','7ouis81600521474642.jpg',0,1,'2020-09-19 13:17:56','2020-09-19 13:32:53','ej22bw1600522370218.pdf');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `bookAuthors` varchar(255) DEFAULT NULL,
  `description` text,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Black Swan','Pera','Nasim Taleb','Very interestin book',9,'2020-08-10 16:43:41','2020-08-10 16:43:41'),(2,'Black Swan','Mile','Nasim Taleb','Ok',7,'2020-08-24 18:53:43','2020-08-24 18:53:43'),(3,'Black Swan','Mare','Nasim Taleb','Inspirativna',8,'2020-08-24 19:00:48','2020-08-24 19:00:48'),(4,'Stranac','Mare','Alber Kami','Veoma zanimljiva i veoma neobicna knjiga',8,'2020-08-24 19:22:04','2020-08-26 16:07:39'),(5,'Black Swan','Mica','Nasim Taleb','Previse o ekonomiji za moj ukus',7,'2020-08-24 19:22:56','2020-08-24 19:22:56'),(6,'Luca Mikrokozma','Mica','Njegos','Zbunjujuca knjiga',4,'2020-08-24 19:23:34','2020-09-19 18:06:40'),(7,'Veliki Getsbi','Mica','Fitz','Lepa knjiga',8,'2020-08-24 19:24:13','2020-08-24 19:24:13'),(8,'War and Peace','Pera','Leo Tolstoy','Wow',10,'2020-08-24 23:44:31','2020-08-24 23:44:31'),(9,'Primenjena Kriptografija','Pera','Bruce Schneier','Cool',7,'2020-08-26 14:14:40','2020-08-26 14:14:40'),(10,'Luca Mikrokozma','Pera','Njegos','Zanimljiva knjiga',8,'2020-08-26 14:23:01','2020-08-26 14:23:01'),(11,'Stranac','Mica','Alber Kami','Wow',9,'2020-08-26 14:28:07','2020-08-26 14:28:07'),(12,'Veliki Getsbi','Dzoni','Fitzgerald','Okej',7,'2020-08-30 19:03:37','2020-08-30 19:03:37'),(13,'Primenjena Kriptografija','Mica','Brus Snajer','Korisna knjiga',8,'2020-09-19 17:58:08','2020-09-19 17:58:08'),(14,'Primenjena Kriptografija','Dzoni','Brus Snajer','Korisna knjiga!',9,'2020-09-19 17:59:41','2020-09-19 17:59:41');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventPosts`
--

DROP TABLE IF EXISTS `eventPosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventPosts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventPosts`
--

LOCK TABLES `eventPosts` WRITE;
/*!40000 ALTER TABLE `eventPosts` DISABLE KEYS */;
INSERT INTO `eventPosts` VALUES (1,'ComicCon','Mica','New batman coming soon!','2020-08-27 18:31:02','2020-08-27 18:31:02'),(2,'Klub drugara','Mare','Zdravo svima!','2020-08-27 19:51:59','2020-08-27 19:51:59'),(3,'Dead Poets Society','Dzoni','Welcome everyone!','2020-08-30 14:02:07','2020-08-30 14:02:07'),(4,'Izlozba antikvarnih knjiga','Mica','Donecu na izlozbu potpisan komplet knjiga Dobrice Cosica.','2020-08-30 20:00:30','2020-08-30 20:00:30'),(5,'Sajam Knjiga Beograd','Mica','Koliki ce biti popust za studente za ulaz na sajam?','2020-08-30 20:01:07','2020-08-30 20:01:07'),(6,'Rusko Knjizevno Vece','Mile','Jel procitao neko Bracu karamazovi?','2020-08-30 20:04:08','2020-08-30 20:04:08'),(7,'Dead Poets Society','Dzoni','Jel gledao neko ovaj poznat film?','2020-09-19 18:19:29','2020-09-19 18:19:29');
/*!40000 ALTER TABLE `eventPosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `private` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'ComicCon',0,0,'Pera','2020-08-10 16:43:41','2020-08-22 23:44:49','Marvel and DC','2020-08-22 23:44:49','2020-08-22 23:44:49'),(2,'Klub drugara',1,1,'Pera',NULL,NULL,'Okupljanje prijatelja','2020-08-27 15:46:17','2020-08-30 16:41:44'),(3,'Rusko Knjizevno Vece',0,1,'Pera','2020-08-29 00:00:00','2020-09-24 00:00:00','Komentarisanje ruskih klasika','2020-08-27 15:44:24','2020-08-27 15:44:24'),(4,'Sajam Knjiga Beograd',0,1,'Pera',NULL,'2020-09-03 00:00:00','Skup malih i velikih izdavackih kuca','2020-08-27 15:46:17','2020-08-27 15:46:17'),(5,'Dead Poets Society',1,1,'Dzoni',NULL,'2025-11-11 00:00:00','English teacher who inspires his students through his teaching of poetry. ','2020-08-27 15:46:17','2020-09-19 18:12:58'),(7,'Razmena polovnih knjiga',1,0,'Mica','2020-09-23 00:00:00','2020-09-30 00:00:00','Dogadjaj razmene knjiga','2020-08-30 17:10:54','2020-08-30 17:10:54'),(8,'Izlozba antikvarnih knjiga',1,1,'Mica','2020-08-18 00:00:00','2020-09-28 00:00:00','Izlozba izuzetno starih i retkih knjiga','2020-08-30 17:12:17','2020-08-30 20:00:04');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followings`
--

DROP TABLE IF EXISTS `followings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower` varchar(255) DEFAULT NULL,
  `followed` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followings`
--

LOCK TABLES `followings` WRITE;
/*!40000 ALTER TABLE `followings` DISABLE KEYS */;
INSERT INTO `followings` VALUES (4,'Pera','Mare','2020-08-25 20:19:00','2020-08-25 20:19:00'),(5,'Pera','Mica','2020-08-25 20:20:33','2020-08-25 20:20:33'),(6,'Mare','Pera','2020-08-26 14:13:54','2020-08-26 14:13:54'),(7,'Mare','Mica','2020-08-26 14:27:10','2020-08-26 14:27:10'),(8,'Pera','Misa','2020-08-27 20:13:38','2020-08-27 20:13:38'),(9,'Pera','Nini','2020-08-27 20:13:45','2020-08-27 20:13:45'),(10,'Dzoni','Pera','2020-08-30 13:56:11','2020-08-30 13:56:11'),(11,'Dzoni','Stefi','2020-08-30 13:56:19','2020-08-30 13:56:19'),(12,'Dzoni','Jane','2020-08-30 13:56:26','2020-08-30 13:56:26'),(13,'Dzoni','Nini','2020-08-30 13:56:36','2020-08-30 13:56:36'),(14,'Mica','Pera','2020-08-30 17:13:03','2020-08-30 17:13:03'),(15,'Mica','Stefi','2020-08-30 17:13:09','2020-08-30 17:13:09'),(16,'Mica','Mile','2020-08-30 17:13:14','2020-08-30 17:13:14'),(17,'Mile','Mare','2020-08-30 20:15:33','2020-08-30 20:15:33'),(18,'Mile','Nini','2020-08-30 20:15:39','2020-08-30 20:15:39'),(19,'Mile','Jasmin','2020-08-30 20:15:46','2020-08-30 20:15:46'),(20,'Mile','Mire','2020-08-30 20:15:53','2020-08-30 20:15:53'),(21,'Dzoni','Mica','2020-09-19 17:57:08','2020-09-19 17:57:08');
/*!40000 ALTER TABLE `followings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `count` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Science fiction',1,'2019-10-23 00:00:00','2019-10-23 00:00:00'),(2,'Drama',1,'2019-10-23 00:00:00','2019-10-23 00:00:00'),(3,'Biography',0,'2019-10-23 00:00:00','2019-10-23 00:00:00'),(5,'Memoir',0,'2020-08-14 14:39:58','2020-08-14 14:39:58'),(6,'Mistery',0,'2020-08-14 14:40:05','2020-08-14 14:40:05'),(7,'Science',0,'2020-08-14 14:40:11','2020-08-14 14:40:11'),(8,'IT',0,'2020-08-14 14:40:18','2020-08-14 14:40:18'),(10,'History',0,'2020-08-14 14:46:36','2020-08-14 14:46:36'),(11,'Economy',1,'2020-08-14 14:46:36','2020-08-14 14:46:36');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender` varchar(255) DEFAULT NULL,
  `reciever` varchar(255) DEFAULT NULL,
  `book` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'Pera','Mare','Black Swan','2020-08-22 23:44:49','2020-08-22 23:44:49'),(2,'Pera','Mare','Luca Mikrokozma','2020-08-26 14:23:01','2020-08-26 14:23:01'),(3,'Mica','Pera','Stranac','2020-08-26 14:28:07','2020-08-26 14:28:07'),(4,'Mica','Mare','Stranac','2020-08-26 14:28:07','2020-08-26 14:28:07'),(14,'Mica','Pera','Luca Mikrokozma','2020-09-19 18:06:40','2020-09-19 18:06:40'),(15,'Mica','Mare','Luca Mikrokozma','2020-09-19 18:06:40','2020-09-19 18:06:40'),(16,'Mica','Dzoni','Luca Mikrokozma','2020-09-19 18:06:40','2020-09-19 18:06:40');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `readings`
--

DROP TABLE IF EXISTS `readings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `readings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookname` varchar(255) DEFAULT NULL,
  `readername` varchar(255) DEFAULT NULL,
  `toread` tinyint(1) DEFAULT NULL,
  `finished` tinyint(1) DEFAULT NULL,
  `current` int DEFAULT NULL,
  `pages` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `readings`
--

LOCK TABLES `readings` WRITE;
/*!40000 ALTER TABLE `readings` DISABLE KEYS */;
INSERT INTO `readings` VALUES (1,'War and Peace','Pera',0,1,0,235,'2020-08-22 23:44:49','2020-08-28 13:56:22'),(2,'Stranac','Pera',0,0,388,400,'2020-08-22 23:44:49','2020-08-25 15:35:45'),(3,'Black Swan','Pera',0,1,22,421,'2020-08-22 23:44:49','2020-08-28 13:56:11'),(4,'Luca Mikrokozma','Pera',0,0,300,523,'2020-08-22 23:44:49','2020-08-25 20:35:57'),(5,'Veliki Getsbi','Pera',0,1,523,673,'2020-08-22 23:44:49','2020-08-28 13:25:47'),(6,'Primenjena Kriptografija','Pera',1,0,77,98,'2020-08-22 23:44:49','2020-08-28 13:56:55'),(8,'Luca Mikrokozma','Mare',1,0,0,100,'2020-08-25 14:20:56','2020-08-25 14:20:56'),(9,'Black Swan','Mica',0,1,0,100,'2020-08-26 14:27:42','2020-08-30 18:23:23'),(10,'Luca Mikrokozma','Mica',0,1,0,100,'2020-08-26 14:27:44','2020-08-30 18:23:16'),(11,'Veliki Getsbi','Mica',0,1,0,100,'2020-08-26 14:27:46','2020-08-30 18:23:28'),(13,'Stranac','Mare',0,1,0,100,'2020-08-26 16:05:19','2020-08-26 16:05:19'),(14,'Stranac','Mica',0,1,88,100,'2020-08-27 17:00:33','2020-08-30 18:23:19'),(15,'Primenjena Kriptografija','Mica',0,1,0,100,'2020-08-27 17:00:39','2020-08-30 18:23:26'),(16,'Fiktivna knjiga','Mica',0,1,0,100,'2020-08-30 18:23:21','2020-08-30 18:23:21'),(17,'War and Peace','Mica',0,1,0,100,'2020-08-30 18:23:31','2020-08-30 18:23:31'),(18,'Stranac','Dzoni',0,1,0,100,'2020-08-30 19:03:09','2020-08-30 19:03:09'),(19,'Black Swan','Dzoni',1,0,0,100,'2020-08-30 19:03:14','2020-08-30 19:03:14'),(20,'Primenjena Kriptografija','Dzoni',0,1,5,532,'2020-08-30 19:03:23','2020-09-19 17:59:29'),(21,'Veliki Getsbi','Dzoni',0,1,0,100,'2020-08-30 19:03:31','2020-08-30 19:03:31'),(22,'Luca Mikrokozma','Mile',0,1,0,100,'2020-08-30 20:02:24','2020-08-30 20:02:24'),(23,'Stranac','Mile',0,1,0,100,'2020-08-30 20:03:22','2020-08-30 20:03:22'),(24,'Black Swan','Mile',0,1,0,100,'2020-08-30 20:03:24','2020-08-30 20:03:29'),(25,'Primenjena Kriptografija','Mile',0,0,76,100,'2020-08-30 20:03:35','2020-08-30 20:03:35'),(26,'Veliki Getsbi','Mile',0,0,44,100,'2020-08-30 20:03:42','2020-08-30 20:03:42'),(27,'Tunel','Mile',1,0,0,100,'2020-08-30 20:16:17','2020-08-30 20:16:17'),(29,'U potrazi za Fibonacijem','Dzoni',0,0,334,2415,'2020-09-19 17:12:46','2020-09-19 17:12:55'),(30,'Autostoperski vodic kroz galaksiju','Dzoni',1,0,0,100,'2020-09-19 17:13:09','2020-09-19 17:13:09'),(32,'Tunel','Dzoni',0,0,332,456,'2020-09-19 17:13:23','2020-09-19 17:13:30');
/*!40000 ALTER TABLE `readings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resetpasses`
--

DROP TABLE IF EXISTS `resetpasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resetpasses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resetpasses`
--

LOCK TABLES `resetpasses` WRITE;
/*!40000 ALTER TABLE `resetpasses` DISABLE KEYS */;
/*!40000 ALTER TABLE `resetpasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInEvents`
--

DROP TABLE IF EXISTS `userInEvents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userInEvents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInEvents`
--

LOCK TABLES `userInEvents` WRITE;
/*!40000 ALTER TABLE `userInEvents` DISABLE KEYS */;
INSERT INTO `userInEvents` VALUES (1,'ComicCon','Mica',1,'2020-08-27 18:45:46','2020-08-27 18:45:46'),(3,'Klub drugara','Pera',1,'2020-08-27 19:36:19','2020-08-27 19:36:19'),(4,'Klub drugara','Mica',0,'2020-08-27 19:50:05','2020-08-27 19:50:05'),(5,'Rusko Knjizevno Vece','Mare',1,'2020-08-27 19:50:19','2020-08-27 19:50:19'),(6,'Klub drugara','Mare',1,'2020-08-27 19:50:29','2020-08-27 19:51:28'),(7,'Sajam Knjiga Beograd','Mare',1,'2020-08-27 19:50:37','2020-08-27 19:50:37'),(8,'Klub drugara','Nini',1,'2020-08-27 20:17:23','2020-08-27 20:17:23'),(9,'Dead Poets Society','Pera',1,'2020-08-30 14:00:45','2020-08-30 14:00:45'),(10,'Dead Poets Society','Nini',1,'2020-08-30 14:00:45','2020-08-30 14:00:45'),(11,'Dead Poets Society','Jane',1,'2020-08-30 14:00:45','2020-08-30 14:00:45'),(12,'Dead Poets Society','Dzoni',1,'2020-08-30 14:01:54','2020-08-30 14:01:57'),(13,'ComicCon','Pera',1,'2020-08-30 16:17:44','2020-08-30 16:17:44'),(14,'Rusko Knjizevno Vece','Pera',1,'2020-08-30 16:18:49','2020-08-30 16:18:49'),(15,'Sajam Knjiga Beograd','Pera',1,'2020-08-30 16:19:00','2020-08-30 16:19:00'),(16,'Razmena polovnih knjiga','Mica',1,'2020-08-30 17:10:54','2020-08-30 17:10:54'),(17,'Izlozba antikvarnih knjiga','Mica',1,'2020-08-30 17:12:17','2020-08-30 17:12:17'),(18,'Sajam Knjiga Beograd','Mica',1,'2020-08-30 20:00:52','2020-08-30 20:00:52'),(19,'Rusko Knjizevno Vece','Mile',1,'2020-08-30 20:03:55','2020-08-30 20:03:55'),(20,'Izlozba antikvarnih knjiga','Mile',0,'2020-08-30 20:04:18','2020-08-30 20:04:18');
/*!40000 ALTER TABLE `userInEvents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'GreatReadsDB'
--

--
-- Dumping routines for database 'GreatReadsDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-19 20:46:35
