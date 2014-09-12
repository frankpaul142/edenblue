/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     12/09/2014 17:32:55                          */
/*==============================================================*/


drop table if exists excursion;

drop table if exists photo;

drop table if exists reservation;

drop table if exists room;

drop table if exists rooms_booked;

drop table if exists service;

drop table if exists user;

/*==============================================================*/
/* Table: excursion                                             */
/*==============================================================*/
create table excursion
(
   id                   int not null auto_increment,
   title                varchar(200) not null,
   description          text not null,
   status               enum('ACTIVE','INACTIVE') not null,
   primary key (id)
);

/*==============================================================*/
/* Table: photo                                                 */
/*==============================================================*/
create table photo
(
   id                   int not null auto_increment,
   room_id              int,
   service_id           int,
   excursion_id         int,
   source               varchar(255) not null,
   status               enum('ACTIVE','INACTIVE') not null,
   primary key (id)
);

/*==============================================================*/
/* Table: reservation                                           */
/*==============================================================*/
create table reservation
(
   id                   int not null auto_increment,
   user_id              int not null,
   arrival_date         date not null,
   departure_date       date,
   adults               int not null,
   children             int,
   booked_date          datetime not null,
   status               enum('CREATED','PAID','CANCELED','ERROR','CONSUMED') not null,
   primary key (id)
);

/*==============================================================*/
/* Table: room                                                  */
/*==============================================================*/
create table room
(
   id                   int not null auto_increment,
   type                 enum('SIMPLE','DOBLE') not null,
   description          varchar(255),
   number               int not null,
   status               enum('VACANT','BOOKED','OCUPPIED','INACTIVE') not null,
   primary key (id)
);

/*==============================================================*/
/* Table: rooms_booked                                          */
/*==============================================================*/
create table rooms_booked
(
   reservation_id       int not null,
   room_id              int not null,
   primary key (reservation_id, room_id)
);

/*==============================================================*/
/* Table: service                                               */
/*==============================================================*/
create table service
(
   id                   int not null auto_increment,
   title                varchar(200) not null,
   description          text,
   status               enum('ACTIVE','INACTIVE') not null,
   primary key (id)
);

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   id                   int not null auto_increment,
   name                 varchar(50) not null,
   lastname             varchar(50) not null,
   email                varchar(250) not null,
   password             varchar(255) not null,
   phone                varchar(15),
   birthday             date,
   creation_date        datetime not null,
   status               enum('ACTIVE','INACTIVE') not null,
   primary key (id)
);

alter table photo add constraint fk_gallery_excursion foreign key (excursion_id)
      references excursion (id) on delete restrict on update restrict;

alter table photo add constraint fk_gallery_room foreign key (room_id)
      references room (id) on delete restrict on update restrict;

alter table photo add constraint fk_gallery_service foreign key (service_id)
      references service (id) on delete restrict on update restrict;

alter table reservation add constraint fk_books foreign key (user_id)
      references user (id) on delete restrict on update restrict;

alter table rooms_booked add constraint fk_rooms_booked foreign key (reservation_id)
      references reservation (id) on delete restrict on update restrict;

alter table rooms_booked add constraint fk_rooms_booked2 foreign key (room_id)
      references room (id) on delete restrict on update restrict;

