create table ProductType (
	ProductTypeId int not null identity(1,1) primary key,
	Category varchar(250) not null
)

insert into ProductType (Category)
values ('Celebration'),
		('Party'),
		('Fruit'),
		('Formal'),
		('Casual')

select *
from ProductType