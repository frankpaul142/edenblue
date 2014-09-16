/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.23 : Database - edenblue
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`edenblue` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `edenblue`;

/*Table structure for table `photo` */

DROP TABLE IF EXISTS `photo`;

CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_room_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `source` varchar(255) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gallery_room` (`type_room_id`),
  KEY `fk_gallery_service` (`service_id`),
  CONSTRAINT `fk_gallery_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  CONSTRAINT `fk_gallery_room` FOREIGN KEY (`type_room_id`) REFERENCES `type_room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `photo` */

insert  into `photo`(`id`,`type_room_id`,`service_id`,`source`,`status`) values (1,NULL,1,'img-serv-01.jpg','ACTIVE'),(2,NULL,7,'img-serv-02.jpg','ACTIVE'),(3,NULL,8,'img-serv-03.jpg','ACTIVE'),(4,NULL,9,'fondo2.jpg','ACTIVE');

/*Table structure for table `reservation` */

DROP TABLE IF EXISTS `reservation`;

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `arrival_date` date NOT NULL,
  `departure_date` date DEFAULT NULL,
  `adults` int(11) NOT NULL,
  `children` int(11) DEFAULT NULL,
  `booked_date` datetime NOT NULL,
  `status` enum('CREATED','PAID','CANCELED','ERROR','CONSUMED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_books` (`user_id`),
  CONSTRAINT `fk_books` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `reservation` */

/*Table structure for table `room` */

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `status` enum('VACANT','BOOKED','OCUPPIED','INACTIVE') NOT NULL,
  `price` float(8,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_type_of_room` (`type_id`),
  CONSTRAINT `fk_type_of_room` FOREIGN KEY (`type_id`) REFERENCES `type_room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `room` */

/*Table structure for table `rooms_booked` */

DROP TABLE IF EXISTS `rooms_booked`;

CREATE TABLE `rooms_booked` (
  `reservation_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  PRIMARY KEY (`reservation_id`,`room_id`),
  KEY `fk_rooms_booked2` (`room_id`),
  CONSTRAINT `fk_rooms_booked2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `fk_rooms_booked` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `rooms_booked` */

/*Table structure for table `service` */

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `description` text,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `service` */

insert  into `service`(`id`,`title`,`description`,`status`) values (1,'Restaurante, con áreas de atención interior y exterior','SERVICIOS\r\n\r\nEl Restaurante EdenBlue brinda servicios de desayuno, almuerzo y cena.\r\n\r\nServicio de Desayuno:  En temporada alta (feriados, Julio, Agosto y Diciembre) la Hostería ofrece Desayuno Bufé.  En temporadas bajas la Hostería sirve los Desayunos: Continental, Americano y Desayuno Típico.\r\n\r\nServicio de Almuerzos y Cenas:  La oferta de almuerzos y cenas se presenta según el menú del día o a la carta.  La Carta de Almuerzos y Cenas incluye varios grupos de platos:  Ceviches, Sopas, Pastas, Ensaladas, Pescados y Mariscos, Aves y Postres, preparados con recetas típicas manabitas e internacionales.  La Carta también incluye opciones de comida rápida y platos para niños.\r\n\r\nLos huéspedes pueden ser atendidos en el área interior del restaurante y disfrutar de un ambiente climatizado y confortable o en el ambiente exterior de la pérgola con vista al mar.\r\n','ACTIVE'),(2,'Bar/lounge','Pruebe y disfrute exóticos y deliciosos jugos naturales, cocteles y licores en el Bar y Lounge de EdenBlue.  El personal le presentará la Carta de jugos naturales, cocteles y licores y opciones de snacks y picaditas.','ACTIVE'),(3,'Atención en recepción de 6H00 a 12H00',NULL,'ACTIVE'),(4,'Depósito de maletas',NULL,'ACTIVE'),(5,'Áreas de Parqueadero',NULL,'ACTIVE'),(6,'Áreas climatizadas de Hospedaje y Servicios',NULL,'ACTIVE'),(7,'Acceso directo a playa privada',NULL,'ACTIVE'),(8,'Vista al mar y Balcón privado en todas las habitaciones',NULL,'ACTIVE'),(9,'Excursiones','OFERTA\r\n\r\nIntérnese en la selva y descubra su sorprendente flora y fauna.  Explore la belleza natural de las islas que rodean la Península y de su Estuario.  Anímese a practicar pesca deportiva y a avistar ballenas jorobadas. Únase a nuestras excursiones ecológicas guiadas:\r\n\r\nCaminatas y cabalgatas en nuestra selva tropical.\r\nTours en lancha o bote por las Islas:  Del Amor, Júpiter, Bella Vista, El Moro.\r\nPesca Deportiva frente a Cojimíes.\r\nAvistamiento de Ballenas Jorobadas.\r\nVisita a Reserva Ecológica Mache Chindui\r\n\r\nECOSISTEMA\r\n\r\nLa Península de Cojimíes presenta 2 zonas geográfica y topográficamente diferentes:  una zona montañosa desde Pedernales hasta el Caserío Cañaveral en el kilómetro 17, que se caracteriza por sus suelos arcillosos, destinados a la cría de ganado; y las zonas bajas, desde el Caserío Cañaveral  hasta el pueblo turístico de Cojimíes, ubicado en el kilómetro 34.\r\n\r\nEn las Zonas Bajas, en una franja de 17 km cercana al mar, el suelo es arenoso, ideal para el cultivo de Palmeras de Coco, por esto se observan extensas Plantaciones de cocotero a lo largo de la zona costera baja de la Península.  También se presta para el cultivo de frutas tropicales como sandía, melón, papaya. Hacia el Este, los suelos son limo arenosos, aptos para el cultivo de pastizales que alimentan al ganado de carne y leche.\r\n\r\nA tan solo 500 ms de distancia de la Hostería EdenBlue, se puede explorar una selva virgen tropical, habitada por una colonia de 2.000 monos aulladores americanos, y por otras especies como:  guantas, cheques, armadillos, gran diversidad de insectos y mariposas, aves que habitan permanentemente en la selva, tales como gorriones, tordos, caciques y guacharacas (variedad de gallina salvaje) y aves de paso o migratorias como loros pequeños  que la visitan en determinadas épocas del año.\r\n\r\nEn las inmediaciones de la Selva se encuentra “la ciénega”, que es un área extensa con una importante concentración de agua que se encuentra a 3 metros bajo el nivel del mar, la misma que alberga una variedad de peces de agua dulce localmente conocidos como “chames”, muy importantes en la dieta de los lugareños, tortugas carey y una variedad de pato salvaje volador.  Se observa presencia masiva de garzas en los alrededores de la ciénega.\r\n\r\nLa Península de Cojimíes, debido a su condición geográfica, ya que el mar la rodea por el Oeste, Este y Norte, es un puerto pesquero de primer orden de Corvina, Dorado, Robalo, Mero, entre otras especies. Actualmente, se organizan aquí los Campeonatos Internacionales de pesca de corvina.  También se practica pesca deportiva durante todo el año.\r\n\r\nEl lado Este de la Península, en una longitud de 34 km desde el Pueblo de Cojimíes hasta el Estuario de Pedernales, se caracteriza por la presencia de manglares.  Aquí se encuentran piscinas dedicadas principalmente al cultivo de camarón.\r\n\r\nLa característica de esta región casi insular es la humedad, debido a la Corriente cálida de El Niño, que provoca lluvias gran parte del año.  Este fenómeno determina que la temperatura promedio del agua de mar durante el año fluctúe alrededor de los 26°.\r\n','ACTIVE');

/*Table structure for table `type_room` */

DROP TABLE IF EXISTS `type_room`;

CREATE TABLE `type_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `type_room` */

insert  into `type_room`(`id`,`name`,`description`) values (1,'MATRIMONIALES','Equipadas con una cama matrimonial de 2 ½ plazas (Queen) o una cama matrimonial de 2 plazas (Full) según la disponibilidad.  Vista al mar y balcón privado.  Aire acondicionado.  TV por cable.'),(2,'SIMPLES','Equipadas con una cama individual (2) o una cama matrimonial (1) si es que hay disponibilidad. Vista al mar y balcón privado.  Aire acondicionado.  TV por cable.'),(3,'DOBLES','Equipadas con una cama matrimonial (1) y una cama individual (2). Vista al mar y balcón privado.  Aire acondicionado.  TV por cable.'),(4,'TRIPLES','Equipadas con una cama matrimonial (1) y dos camas individuales (2). Vista al mar y balcón privado.  Aire acondicionado.  TV por cable.\r\n\r\n(1)	Cama matrimonial:  cama de 2 ½ plazas (Queen) o cama de 2 plazas (Full).\r\n(2)	Cama individual:  cama de 1 ½ plazas (Twin) o cama de 1 ¼ plazas.\r\n'),(5,'LOFT','Loft con 2 habitaciones dobles y sus respectivos baños completos, sala, comedor y cocina.  Acceso a un balcón en el segundo piso y a una terraza en el tercer piso, con extraordinaria vista al mar.  Aire acondicionado.  TV por cable.  La capacidad máxima de ocupación es para 6 personas.');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
