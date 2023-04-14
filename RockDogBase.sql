CREATE SCHEMA `RockDog`;

CREATE TABLE `RockDog`.`marcas` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `marca` VARCHAR(255) NOT NULL
);

CREATE TABLE `RockDog`.`productos` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `detalle` VARCHAR(255) NOT NULL,
  `imagen` TEXT NOT NULL,
  `estado` INT NOT NULL,
  `precio` INT NOT NULL,
  `stock` INT NOT NULL,
  `FK_marca` INT NOT NULL
);

CREATE TABLE `RockDog`.`categorias` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(255) NOT NULL
);

CREATE TABLE `RockDog`.`usuarios` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `apellido` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rango` INT NOT NULL,
  `estado` INT NOT NULL,
  `imagen` TEXT NOT NULL
);

CREATE TABLE `RockDog`.`productos_usuarios` (
  `id` INT PRIMARY KEY NOT NULL,
  `ID_productos` INT NOT NULL,
  `ID_usuario` INT NOT NULL
);


CREATE TABLE `RockDog`.`compras` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ID_usuario` INT NOT NULL,
  `total` INT NOT NULL,
  `direccion_envio` VARCHAR(255) NOT NULL
);

CREATE TABLE `RockDog`.`productos_compras` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ID_compras` INT NOT NULL,
  `ID_productos` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` INT NOT NULL
);

CREATE TABLE `RockDog`.`categoria_productos` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ID_producto` INT NOT NULL,
  `ID_categoria` INT NOT NULL
);

CREATE INDEX `productos_fk_marca_foreign` ON `RockDog`.`productos` (`FK_marca`);

CREATE INDEX `productos_usuarios_id_productos_foreign` ON `RockDog`.`productos_usuarios` (`ID_productos`);

CREATE INDEX `productos_usuarios_id_usuario_foreign` ON `RockDog`.`productos_usuarios` (`ID_usuario`);

CREATE INDEX `compras_id_usuario_foreign` ON `RockDog`.`compras` (`ID_usuario`);

CREATE INDEX `productos_compras_id_compras_foreign` ON `RockDog`.`productos_compras` (`ID_compras`);

CREATE INDEX `productos_compras_id_productos_foreign` ON `RockDog`.`productos_compras` (`ID_productos`);

CREATE INDEX `categoria_productos_id_categoria_foreign` ON `RockDog`.`categoria_productos` (`ID_categoria`);

CREATE INDEX `categoria_productos_id_producto_foreign` ON `RockDog`.`categoria_productos` (`ID_producto`);

ALTER TABLE `RockDog`.`productos` ADD CONSTRAINT `productos_fk_marca_foreign` FOREIGN KEY (`FK_marca`) REFERENCES `RockDog`.`marcas` (`id`);

ALTER TABLE `RockDog`.`productos_usuarios` ADD CONSTRAINT `productos_usuarios_id_productos_foreign` FOREIGN KEY (`ID_productos`) REFERENCES `RockDog`.`productos` (`id`);

ALTER TABLE `RockDog`.`productos_usuarios` ADD CONSTRAINT `productos_usuarios_id_usuario_foreign` FOREIGN KEY (`ID_usuario`) REFERENCES `RockDog`.`usuarios` (`id`);

ALTER TABLE `RockDog`.`compras` ADD CONSTRAINT `compras_id_usuario_foreign` FOREIGN KEY (`ID_usuario`) REFERENCES `RockDog`.`usuarios` (`id`);

ALTER TABLE `RockDog`.`productos_compras` ADD CONSTRAINT `productos_compras_id_compras_foreign` FOREIGN KEY (`ID_compras`) REFERENCES `RockDog`.`compras` (`id`);

ALTER TABLE `RockDog`.`productos_compras` ADD CONSTRAINT `productos_compras_id_productos_foreign` FOREIGN KEY (`ID_productos`) REFERENCES `RockDog`.`productos` (`id`);

ALTER TABLE `RockDog`.`categoria_productos` ADD CONSTRAINT `categoria_productos_id_categoria_foreign` FOREIGN KEY (`ID_categoria`) REFERENCES `RockDog`.`categorias` (`id`);

ALTER TABLE `RockDog`.`categoria_productos` ADD CONSTRAINT `categoria_productos_id_producto_foreign` FOREIGN KEY (`ID_producto`) REFERENCES `RockDog`.`productos` (`id`);

INSERT INTO `RockDog`.`usuarios` VALUES (1,'Nayme','Da Rosa','naymedarosa@gmail.com','$2a$10$3mdmy15O5Uwgkz0oF4EE2uvKF36u6wDu3B5TRK.S5IhzNT.YmbXMK',3,0,'Avatar-1658877864534.jpg'),(2,'Lucas','Bianco','lbianco0000@gmail.com','$2a$12$xS1S6UeyYIFXKhe0GqwnD.vFMOBWmaKbgCC/oCQPZXA4ng8zisACW',3,0,'Avatar-1658852236821.jpeg'),(3,'Carline','Gini','cgini2@pcworld.com','B9UrotQFX',1,0,'http://dummyimage.com/139x243.png/dddddd/000000'),(4,'Donia','Drife','ddrife3@chronoengine.com','dL8qXkSJJX',1,0,'http://dummyimage.com/165x240.png/5fa2dd/ffffff'),(5,'Boyce','Becom','bbecom4@hugedomains.com','TP2no5VIIJG',1,0,'http://dummyimage.com/139x142.png/dddddd/000000'),(6,'Yehudit','Pescud','ypescud5@cloudflare.com','wnYv2ss5',1,0,'http://dummyimage.com/203x233.png/5fa2dd/ffffff'),(7,'Geraldine','Gliddon','ggliddon6@chron.com','9XPOCUQlU',1,0,'http://dummyimage.com/207x216.png/dddddd/000000'),(8,'Wren','Strelitzki','wstrelitzki7@ucoz.ru','hfTUGLgxXQqt',1,0,'http://dummyimage.com/145x142.png/ff4444/ffffff'),(9,'Turner','Christian','tchristian8@dot.gov','8mzQeltZRb1',1,0,'http://dummyimage.com/202x242.png/5fa2dd/ffffff'),(10,'Hewie','Trayes','htrayes9@google.nl','SCf6qE1xzm',1,0,'http://dummyimage.com/173x171.png/cc0000/ffffff'),(11,'Jorge','Wintour','jwintoura@ehow.com','nOVt2e7',1,0,'http://dummyimage.com/191x152.png/dddddd/000000'),(12,'Renado','Spottiswood','rspottiswoodb@google.pl','uCZAfA',1,0,'http://dummyimage.com/178x132.png/ff4444/ffffff'),(13,'Gerhardt','Aspole','gaspolec@china.com.cn','6yjNAtijqVO',1,0,'http://dummyimage.com/216x194.png/cc0000/ffffff'),(14,'Karney','Tamburi','ktamburid@symantec.com','ZlkUurSc4q7G',1,0,'http://dummyimage.com/110x216.png/dddddd/000000'),(15,'Marena','Hext','mhexte@vimeo.com','pi6ST9ht',1,0,'http://dummyimage.com/184x183.png/ff4444/ffffff');
INSERT INTO `RockDog`.`marcas` VALUES (1,'Ekanuba'),(2,'Royal Cannin'),(3,'Infinity'),(4,'Vagoneta'),(5,'Whiskas'),(6,'Tropimix'),(7,'marca k es eso');
INSERT INTO `RockDog`.`categorias` VALUES (1,'Perros'),(2,'Gatos'),(3,'Otros');
INSERT INTO `RockDog`.`productos` VALUES (1,'EUKANUBA PUPPY GRANDE','Recomendado para cachorros entre 1 y 12 meses de edad en el caso de razas grandes o hasta los 24 meses en el caso de razas gigantes. Alimento balancead','DISPONIBLE EN: 1kg / 3kg / 15kg.','eukanuba-puppy-grande.jpg',1,8800,2,1),(2,'Tiernitos carne','La selecciÃ³n de un alimento adecuado para tu mascota es muy importante para garantizar su crecimiento, desarrollo y salud.','DISPONIBLE EN: 1kg / 3kg / 15kg.','tiernitos-carne.jpg',0,7000,2,3),(3,'Royal Canin  Adult','Royal Canin produce alimentos centrados en las necesidades Ãºnicas de tu mascota, brinda una nutriciÃ³n especÃ­fica y eficaz, y lo ayuda a convertirse en su mejor versiÃ³n.  Tu mascota siempre saludable Ellos son parte de la familia y nos regalan su compaÃ±Ã­a y su cariÃ±o. Para que se mantengan sanos y fuertes, una alimentaciÃ³n balanceada es esencial. Brindale a tu perro los nutrientes que necesita para que pueda correr, saltar y jugar todo el dÃ­a.  Beneficios del alimento seco La mayor ventaja de la comida seca para mascotas es que se puede almacenar por mucho mÃ¡s tiempo sin que se deteriore, y evita la apariciÃ³n de hongos o bacterias. AdemÃ¡s, este tipo de alimento ayuda a eliminar el sarro y a retrasar la formaciÃ³n de la placa dental con el proceso de masticaciÃ³n y trituraciÃ³n.','DISPONIBLE EN: 1kg / 3kg / 15kg.','rc_adulto_medium.jpg',0,6000,2,2),(4,'Royal Canin Bulldog Puppy','Alimento para perros cachorros de raza Bulldog â€“ Hasta los 12 meses de edad.','DISPONIBLE EN: 1kg / 3kg / 15kg.','rc-bulldog-puppy.jpg',0,9000,2,7),(5,'Purina Excellent Gatos','Alimento balanceado y completo para gatos castrados adultos y en crecimiento.','DISPONIBLE EN: 1kg / 3kg / 15kg.','excellent-gato-urinary.jpg',0,5000,2,4),(6,'Infinity Gato','Papita para gato','DISPONIBLE EN: 1kg / 3kg / 15kg.','infinity-gato.jpg',0,4000,2,4),(7,'Alimento Vagoneta Gatos','INGREDIENTES: Harina de carne, harina de vÃ­sceras de pollo, harina de pescado, grasa de pollo, harina de trigo, arroz, maÃ­z, fibra de maÃ­z, afrechillo de trigo, gluten de maÃ­z, pellet de soja, pulpa de remolacha, levadura de cerveza, extracto de yucca schidigera, harina de germen de maÃ­z desgrasado, aceite de girasol de alto oleico, taurina, metionina, sal, celulosa, inulina, zeolita, manano-oligosacÃ¡ridos. Saborizante: hidrolizado de vÃ­sceras. Acidificante: Ã¡cido fosfÃ³rico y bisulfato Ã¡cido de sodio. Conservante: sorbato de potasio. AntifÃºngico: Ã¡cido propiÃ³nico y propionato de calcio. Antioxidantes: BHT/ BHA/Ã¡cido cÃ­trico/EDTA etoxiquina. NÃºcleo vitamÃ­nico-mineral: Vitaminas: A, B1, B2, B6, B12, D3, E, K, Ã¡cido fÃ³lico, Ã¡cido nicotÃ­nico, Ã¡cido pantotÃ©nico, biotina, colina. Minerales: zinc, hierro, cobre, manganeso, yodo, selenio.','DISPONIBLE EN: 1kg / 3kg / 15kg.','vagoneta-gato.jpg',0,8000,2,6),(8,'Whiskas Sobre','Sobre de comida nefasta para gatos','DISPONIBLE EN: 1kg / 3kg / 15kg.','whiskas-sobre.png',0,7000,2,5),(9,'Mezcla canarios','ni idea es comida de canarios','DISPONIBLE EN: 1kg / 3kg / 15kg.','mezcla-canarios.jpg',0,7000,2,3),(10,'tropimic Cobayos y conejos','donde cagan los bichos estos','DISPONIBLE EN: 1kg / 3kg / 15kg.','tropimix-1kg-cobayos-y-conejos.jpg',0,5000,2,5),(11,'Ropita con DINOSAURIOS','Es ropita bro no se que esperas de esto PERO TIENE DINOSAURIOS PADREEEEEEEEEEEE','negro','Producto-1659072264758.jpg',0,1200,22,7);
INSERT INTO `RockDog`.`categoria_productos` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,2),(6,6,2),(7,7,2),(8,8,2),(9,9,3),(10,10,3),(11,11,3);