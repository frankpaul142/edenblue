/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     16/09/2014 11:39:30                          */
/*==============================================================*/


drop table if exists photo;

drop table if exists reservation;

drop table if exists room;

drop table if exists rooms_booked;

drop table if exists service;

drop table if exists type_room;

drop table if exists user;

/*==============================================================*/
/* Table: photo                                                 */
/*==============================================================*/
create table photo
(
   id                   int not null auto_increment,
   type_room_id         int,
   service_id           int,
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
   type_id              int not null,
   number               int not null,
   status               enum('VACANT','BOOKED','OCUPPIED','INACTIVE') not null,
   price                float(8,2) not null,
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
   title                varchar(250) not null,
   description          text,
   status               enum('ACTIVE','INACTIVE') not null,
   primary key (id)
);

/*==============================================================*/
/* Table: type_room                                             */
/*==============================================================*/
create table type_room
(
   id                   int not null auto_increment,
   name                 varchar(20) not null,
   description          text,
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

alter table photo add constraint fk_gallery_room foreign key (type_room_id)
      references type_room (id) on delete restrict on update restrict;

alter table photo add constraint fk_gallery_service foreign key (service_id)
      references service (id) on delete restrict on update restrict;

alter table reservation add constraint fk_books foreign key (user_id)
      references user (id) on delete restrict on update restrict;

alter table room add constraint fk_type_of_room foreign key (type_id)
      references type_room (id) on delete restrict on update restrict;

alter table rooms_booked add constraint fk_rooms_booked foreign key (reservation_id)
      references reservation (id) on delete restrict on update restrict;

alter table rooms_booked add constraint fk_rooms_booked2 foreign key (room_id)
      references room (id) on delete restrict on update restrict;

