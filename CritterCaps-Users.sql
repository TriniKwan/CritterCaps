create database CritterCaps

use CritterCaps

create table [User](
ID int primary key identity (1,1) not null,
FirstName varchar(50) not null, 
LastName varchar(50) not null, 
AccountDate datetime not null,
Administrator bit not null
);


insert into [User] (FirstName,LastName,AccountDate,Administrator)
values('Emilee','Mitchell', '1984-09-27',1),('Laura','Collins', '1984-07-20',0),('Randy','Tate', '1986-01-28',0),('Monica','Djunaidi', '1990-06-15',0)

select *
from [User]