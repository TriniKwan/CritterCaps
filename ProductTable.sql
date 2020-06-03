create table Products (
	ProductId int not null identity(1,1) primary key,
	ProductTypeId int foreign key references ProductType(ProductTypeId),
	AnimalTypeId int foreign key references AnimalType(AnimalId),
	Title varchar(250) not null,
	[Description] varchar(250) not null,
	Quantity int not null,
	Price decimal not null,
	imageUrl varchar(250),
	inStock BIT not null
)

insert into Products (ProductTypeId, AnimalTypeId,Title,[Description], Quantity, Price, imageUrl, inStock)
values('1','3', 'Kittys Graduation', 'Celebrate graduation day with this fancy graduation cap for cats!', 5, 2.50, 'http://cutecatsinhats.com/wp-content/uploads/2016/01/graduation-cap-cat.jpg', 1),
('1','1', 'Pink Pimpin', 'Let your frog hop out in style in this pimpin pink hat and monicle!', 10, 6.00, 'https://laughingsquid.com/wp-content/uploads/2017/03/with-feather-and-monocle.jpg', 1),
('5','5', 'Summer Sun Hat', 'The perfect hat for a summer cookout with your horse!', 9, 10.00, 'https://img1.etsystatic.com/066/0/7232254/il_fullxfull.800186123_p749.jpg', 1),
('5','2', 'Straw Cowboy', 'Howdy Partner!', 6, 5.25, 'https://i.dailymail.co.uk/i/pix/2013/05/23/article-2329364-19EDD0C7000005DC-76_634x608.jpg', 1),
('3','3', 'Apple Hat', 'Enjoy this cute kitty apple hat!', 7, 7.75, 'https://cdn.shopify.com/s/files/1/1668/3597/files/IMG_6105_large.jpg', 1),
('4','4', 'Little Derby', 'Get a classy bowler for your little friend!', 3, 12.99, 'https://img1.etsystatic.com/003/1/6346336/il_fullxfull.382575875_4sci.jpg', 1)

select *
from Products
