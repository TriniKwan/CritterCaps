create table PaymentType(
PaymentID int primary key identity (1,1) not null,
[Type] varchar(50) not null, 
UserID int foreign key references [User](ID),
AccountNumber int not null
);

insert into PaymentType ([Type],UserID,AccountNumber)
values('Mastercard','1','5000'), ('Visa','2','4000'), ('Paypal','3','010101'), ('Google Pay','3','101010'), ('Apple Pay','3','27753')

select *
from PaymentType