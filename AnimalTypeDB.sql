create table AnimalType (
AnimalId int not null identity(1,1) primary key,
AnimalType varchar(250) not null
)

insert into AnimalType (AnimalType)
values ('Reptiles'),
		('Dogs'),
		('Cats'),
		('Rodents'),
		('Large Mammals')

select *
from AnimalType

select AnimalType as "Animal Type"
from AnimalType
where AnimalType = 'Reptiles';

