﻿CREATE TABLE SourceMessage
(
    id INTEGER PRIMARY KEY,
    category VARCHAR(32),
    message TEXT
);
CREATE TABLE Message
(
    id INTEGER,
    language VARCHAR(16),
    translation TEXT,
    PRIMARY KEY (id, language),
    CONSTRAINT FK_Message_SourceMessage FOREIGN KEY (id)
         REFERENCES SourceMessage (id) ON DELETE CASCADE ON UPDATE RESTRICT
);

insert into `sourcemessage` (`id`, `category`, `message`) values('0','rooms','room_MATRIMONIALES_name');
insert into `sourcemessage` (`id`, `category`, `message`) values('1','rooms','room_MATRIMONIALES_description');
insert into `sourcemessage` (`id`, `category`, `message`) values('2','rooms','room_SIMPLES_name');
insert into `sourcemessage` (`id`, `category`, `message`) values('3','rooms','room_SIMPLES_description');
insert into `sourcemessage` (`id`, `category`, `message`) values('4','rooms','room_DOBLES_name');
insert into `sourcemessage` (`id`, `category`, `message`) values('5','rooms','room_DOBLES_description');
insert into `sourcemessage` (`id`, `category`, `message`) values('6','rooms','room_TRIPLES_name');
insert into `sourcemessage` (`id`, `category`, `message`) values('7','rooms','room_TRIPLES_description');
insert into `sourcemessage` (`id`, `category`, `message`) values('8','rooms','room_LOFT_name');
insert into `sourcemessage` (`id`, `category`, `message`) values('9','rooms','room_LOFT_description');
insert into `sourcemessage` (`id`, `category`, `message`) values('10','services','service_Restaurante_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('11','services','service_Restaurante_description');
insert into `sourcemessage` (`id`, `category`, `message`) values('12','services','service_Bar-lounge_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('13','services','service_Bar-lounge_description');
insert into `sourcemessage` (`id`, `category`, `message`) values('14','services','service_Atención en recepción de 6H00 a 12H00_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('15','services','service_Depósito de maletas_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('16','services','service_Áreas de Parqueadero_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('17','services','service_Áreas climatizadas de Hospedaje y Servicios_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('18','services','service_Acceso directo a playa privada_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('19','services','service_Vista al mar y Balcón privado en todas las habitaciones_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('20','services','service_Excursiones_title');
insert into `sourcemessage` (`id`, `category`, `message`) values('21','services','service_Excursiones_description');
insert into `message` (`id`, `language`, `translation`) values('0','en','MARRIAGE');
insert into `message` (`id`, `language`, `translation`) values('0','es','MATRIMONIALES');
insert into `message` (`id`, `language`, `translation`) values('1','en','Equipped with a double bed 2 ½ squares (Queen) or a double bed for 2 people (Full) depending on availability. Ocean views and private balconies. Air conditioning. Cable TV.');
insert into `message` (`id`, `language`, `translation`) values('1','es','Equipadas con una cama matrimonial de 2 ½ plazas (Queen) o una cama matrimonial de 2 plazas (Full) según la disponibilidad. Vista al mar y balcón privado. Aire acondicionado. TV por cable.');
insert into `message` (`id`, `language`, `translation`) values('2','en','SIMPLE');
insert into `message` (`id`, `language`, `translation`) values('2','es','SIMPLES');
insert into `message` (`id`, `language`, `translation`) values('3','en','Furnished with a single bed (2) or a double bed (1) if there is availability. Ocean views and private balconies. Air conditioning. Cable TV.');
insert into `message` (`id`, `language`, `translation`) values('3','es','Equipadas con una cama individual (2) o una cama matrimonial (1) si es que hay disponibilidad. Vista al mar y balcón privado. Aire acondicionado. TV por cable.');
insert into `message` (`id`, `language`, `translation`) values('4','en','DOUBLE');
insert into `message` (`id`, `language`, `translation`) values('4','es','DOBLES');
insert into `message` (`id`, `language`, `translation`) values('5','en','Equipped with a double bed (1) and a single bed (2). Ocean views and private balconies. Air conditioning. Cable TV.');
insert into `message` (`id`, `language`, `translation`) values('5','es','Equipadas con una cama matrimonial (1) y una cama individual (2). Vista al mar y balcón privado. Aire acondicionado. TV por cable.');
insert into `message` (`id`, `language`, `translation`) values('6','en','TRIPLES');
insert into `message` (`id`, `language`, `translation`) values('6','es','TRIPLES');
insert into `message` (`id`, `language`, `translation`) values('7','en','Equipped with a double bed (1) and two single beds (2). Ocean views and private balconies. Air conditioning. Cable TV. (1) Double bed: 2 ½ seater bed (Queen) or 2 places bed (Full). (2) Single Bed: 1 ½ squares (Twin) bed or 1 ¼ squares.');
insert into `message` (`id`, `language`, `translation`) values('7','es','Equipadas con una cama matrimonial (1) y dos camas individuales (2). Vista al mar y balcón privado. Aire acondicionado. TV por cable. (1)	Cama matrimonial: cama de 2 ½ plazas (Queen) o cama de 2 plazas (Full). (2)	Cama individual: cama de 1 ½ plazas (Twin) o cama de 1 ¼ plazas. ');
insert into `message` (`id`, `language`, `translation`) values('8','en','LOFT');
insert into `message` (`id`, `language`, `translation`) values('8','es','LOFT');
insert into `message` (`id`, `language`, `translation`) values('9','en','Loft with 2 double bedrooms and their respective bathrooms, living room and kitchen. Access to a balcony on the second floor and a terrace on the third floor with extraordinary ocean views. Air conditioning. Cable TV. The maximum occupancy is 6 persons.');
insert into `message` (`id`, `language`, `translation`) values('9','es','Loft con 2 habitaciones dobles y sus respectivos baños completos, sala, comedor y cocina. Acceso a un balcón en el segundo piso y a una terraza en el tercer piso, con extraordinaria vista al mar. Aire acondicionado. TV por cable. La capacidad máxima de ocupación es para 6 personas.');
insert into `message` (`id`, `language`, `translation`) values('10','en','Restaurant');
insert into `message` (`id`, `language`, `translation`) values('10','es','Restaurante');
insert into `message` (`id`, `language`, `translation`) values('11','en','SERVICES \r\n\r\nThe EdenBlue restaurant serves breakfast, lunch and dinner. \r\n\r\nBreakfast service: During high season (holidays, July, August and December) the lodge offers Breakfast Buffet. In low season the Inn serves Breakfast: Continental, American and Typical Breakfast. \r\n\r\nLunch and Dinner Service: The offer lunch and dinner menu is presented according to the day or a la carte. The Charter Lunch and Dinner includes several groups of dishes: ceviche, Soups, Pastas, Salads, Seafood, Poultry and Desserts prepared with typical manabitas and international recipes. The Charter also includes fast food options and children\'s meals. \r\n\r\nGuests can be served inside the restaurant area and enjoy a comfortable air-conditioned room or outside on the pergola overlooking the sea environment.');
insert into `message` (`id`, `language`, `translation`) values('11','es','SERVICIOS El Restaurante EdenBlue brinda servicios de desayuno, almuerzo y cena. Servicio de Desayuno: En temporada alta (feriados, Julio, Agosto y Diciembre) la Hostería ofrece Desayuno Bufé. En temporadas bajas la Hostería sirve los Desayunos: Continental, Americano y Desayuno Típico. Servicio de Almuerzos y Cenas: La oferta de almuerzos y cenas se presenta según el menú del día o a la carta. La Carta de Almuerzos y Cenas incluye varios grupos de platos: Ceviches, Sopas, Pastas, Ensaladas, Pescados y Mariscos, Aves y Postres, preparados con recetas típicas manabitas e internacionales. La Carta también incluye opciones de comida rápida y platos para niños. Los huéspedes pueden ser atendidos en el área interior del restaurante y disfrutar de un ambiente climatizado y confortable o en el ambiente exterior de la pérgola con vista al mar. ');
insert into `message` (`id`, `language`, `translation`) values('12','en','Bar-lounge');
insert into `message` (`id`, `language`, `translation`) values('12','es','Bar-lounge');
insert into `message` (`id`, `language`, `translation`) values('13','en','Try and enjoy exotic and delicious natural juices, cocktails and spirits in the Bar and Lounge EdenBlue. Staff will present the Charter of juices, cocktails and spirits and snacks and chopped options.');
insert into `message` (`id`, `language`, `translation`) values('13','es','Pruebe y disfrute exóticos y deliciosos jugos naturales, cocteles y licores en el Bar y Lounge de EdenBlue. El personal le presentará la Carta de jugos naturales, cocteles y licores y opciones de snacks y picaditas.');
insert into `message` (`id`, `language`, `translation`) values('14','en','Care in 6H00 to 12H00 Reception');
insert into `message` (`id`, `language`, `translation`) values('14','es','Atención en recepción de 6H00 a 12H00');
insert into `message` (`id`, `language`, `translation`) values('15','en','Luggage');
insert into `message` (`id`, `language`, `translation`) values('15','es','Depósito de maletas');
insert into `message` (`id`, `language`, `translation`) values('16','en','Parking areas');
insert into `message` (`id`, `language`, `translation`) values('16','es','Áreas de Parqueadero');
insert into `message` (`id`, `language`, `translation`) values('17','en','Heated Hosting and Services Areas');
insert into `message` (`id`, `language`, `translation`) values('17','es','Áreas climatizadas de Hospedaje y Servicios');
insert into `message` (`id`, `language`, `translation`) values('18','en','Direct access to private beach');
insert into `message` (`id`, `language`, `translation`) values('18','es','Acceso directo a playa privada');
insert into `message` (`id`, `language`, `translation`) values('19','en','Ocean views and private balcony in all rooms');
insert into `message` (`id`, `language`, `translation`) values('19','es','Vista al mar y Balcón privado en todas las habitaciones');
insert into `message` (`id`, `language`, `translation`) values('20','en','Excursions');
insert into `message` (`id`, `language`, `translation`) values('20','es','Excursiones');
insert into `message` (`id`, `language`, `translation`) values('21','en','OFFER \r\n\r\nImmerse yourself in the jungle and discover the amazing flora and fauna. Explore the natural beauty of the islands surrounding the peninsula and its estuary. Dare to go fishing and spot humpback whales. Join our guided eco-tours: \r\n\r\nHiking and horseback riding in our rainforest. \r\nTours by boat or boat for the islands: Love, Jupiter, Bella Vista, El Moro. \r\nSport Fishing off Cojimíes. \r\nHumpback Whale. \r\nVisit Mache Chindui Ecological Reserve \r\n\r\nECOSYSTEM \r\n\r\nThe Peninsula Cojimíes geographical and topographical features 2 different areas: a hilly area from Pedernales to the hamlet Canaveral at mile 17, which is characterized by clay soils, for breeding cattle; and the lowlands, from the hamlet Canaveral to the tourist town of Cojimíes, located at kilometer 34. \r\n\r\nIn the Lower Zone, a strip of 17 km near the sea, the sandy soil is ideal for growing coconut palms, so extensive coconut plantations are observed along the low coastal area of the Peninsula. It also lends itself to the cultivation of tropical fruits such as watermelon, cantaloupe, papaya. Towards the east, the soils are sandy loam, suitable for growing pasture feeding cattle meat and milk. \r\n\r\nAt just 500 ms away from the lodge EdenBlue, you can explore a virgin tropical forest, inhabited by a colony of 2,000 American howler monkeys, and other species such as guantas, checks, armadillos, great diversity of insects and butterflies, birds who live permanently in the forest, such as sparrows, thrushes, and guacharacas caciques (variety of wild hen) and migratory birds of passage or as small parrots that visit at certain times of year. \r\n\r\nIn the vicinity of the Jungle \"the swamp\", which is a large area with a high concentration of water is 3 meters below sea level, it is hosting a variety of freshwater fish locally known as very important in the diet of the locals, hawksbill turtles and a variety of flying wild duck \"Chartres\". Massive presence of herons observed around the marsh. \r\n\r\nCojimíes Peninsula, due to its geographical position, as the sea surrounds the west, east and north, is a fishing port first order of Corvina, Dorado, Snook, Grouper, among other species. Currently, here are organized International Championships croaker fishing. Sport fishing is also practiced throughout the year. \r\n\r\nThe east side of the peninsula, at a length of 34 km from the village to the Estuary Cojimíes Pedernales, is characterized by the presence of mangroves. Here are pools principally engaged in shrimp farming. \r\n\r\nThe feature of this region is almost insular moisture, because of the warm current of El Niño, which brings rain much of the year. This phenomenon determines the average temperature of seawater during fluctuates around 26 °.');
insert into `message` (`id`, `language`, `translation`) values('21','es','OFERTA Intérnese en la selva y descubra su sorprendente flora y fauna. Explore la belleza natural de las islas que rodean la Península y de su Estuario. Anímese a practicar pesca deportiva y a avistar ballenas jorobadas. Únase a nuestras excursiones ecológicas guiadas: Caminatas y cabalgatas en nuestra selva tropical. Tours en lancha o bote por las Islas: Del Amor, Júpiter, Bella Vista, El Moro. Pesca Deportiva frente a Cojimíes. Avistamiento de Ballenas Jorobadas. Visita a Reserva Ecológica Mache Chindui ECOSISTEMA La Península de Cojimíes presenta 2 zonas geográfica y topográficamente diferentes: una zona montañosa desde Pedernales hasta el Caserío Cañaveral en el kilómetro 17, que se caracteriza por sus suelos arcillosos, destinados a la cría de ganado; y las zonas bajas, desde el Caserío Cañaveral hasta el pueblo turístico de Cojimíes, ubicado en el kilómetro 34. En las Zonas Bajas, en una franja de 17 km cercana al mar, el suelo es arenoso, ideal para el cultivo de Palmeras de Coco, por esto se observan extensas Plantaciones de cocotero a lo largo de la zona costera baja de la Península. También se presta para el cultivo de frutas tropicales como sandía, melón, papaya. Hacia el Este, los suelos son limo arenosos, aptos para el cultivo de pastizales que alimentan al ganado de carne y leche. A tan solo 500 ms de distancia de la Hostería EdenBlue, se puede explorar una selva virgen tropical, habitada por una colonia de 2.000 monos aulladores americanos, y por otras especies como: guantas, cheques, armadillos, gran diversidad de insectos y mariposas, aves que habitan permanentemente en la selva, tales como gorriones, tordos, caciques y guacharacas (variedad de gallina salvaje) y aves de paso o migratorias como loros pequeños que la visitan en determinadas épocas del año. En las inmediaciones de la Selva se encuentra “la ciénega”, que es un área extensa con una importante concentración de agua que se encuentra a 3 metros bajo el nivel del mar, la misma que alberga una variedad de peces de agua dulce localmente conocidos como “chames”, muy importantes en la dieta de los lugareños, tortugas carey y una variedad de pato salvaje volador. Se observa presencia masiva de garzas en los alrededores de la ciénega. La Península de Cojimíes, debido a su condición geográfica, ya que el mar la rodea por el Oeste, Este y Norte, es un puerto pesquero de primer orden de Corvina, Dorado, Robalo, Mero, entre otras especies. Actualmente, se organizan aquí los Campeonatos Internacionales de pesca de corvina. También se practica pesca deportiva durante todo el año. El lado Este de la Península, en una longitud de 34 km desde el Pueblo de Cojimíes hasta el Estuario de Pedernales, se caracteriza por la presencia de manglares. Aquí se encuentran piscinas dedicadas principalmente al cultivo de camarón. La característica de esta región casi insular es la humedad, debido a la Corriente cálida de El Niño, que provoca lluvias gran parte del año. Este fenómeno determina que la temperatura promedio del agua de mar durante el año fluctúe alrededor de los 26°. ');