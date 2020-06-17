create table Products (
	ProductId int not null identity(1,1) primary key,
	ProductTypeId int foreign key references ProductType(ProductTypeId),
	AnimalTypeId int foreign key references AnimalType(AnimalId),
	Title varchar(250) not null,
	[Description] varchar(250) not null,
	Quantity int not null,
	Price decimal(18,2) not null,
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

drop table Products

-- do this first
ALTER TABLE Products
ADD DateAdded DATE
​
--Run this to update animal type
UPDATE AnimalType
SET AnimalType.AnimalType = 'Small Mammals'
WHERE AnimalId = 4
​
-- run this to update all existing products
UPDATE Products
SET DateAdded = '2020-06-01'
WHERE ProductId = 1
​
UPDATE Products
SET DateAdded = '2020-06-02'
WHERE ProductId = 2
​
UPDATE Products
SET DateAdded = '2020-06-03'
WHERE ProductId = 3
​
UPDATE Products
SET DateAdded = '2020-06-04'
WHERE ProductId = 4
​
UPDATE Products
SET DateAdded = '2020-06-05'
WHERE ProductId = 5
​
UPDATE Products
SET DateAdded = '2020-06-06'
WHERE ProductId = 6
​
--add new products
INSERT INTO Products (ProductTypeId, AnimalTypeId,Title,[Description], Quantity, Price, imageUrl, inStock, DateAdded)
values(5,5, 'COW-Girl Hat', 'The Perfect Cow-Girl hat for your favorite lady cow.', 6, 6.75, 'https://i.ebayimg.com/images/g/X4cAAOSwW9FbNsib/s-l640.jpg', 1, '2020-01-25'),
(5,4, 'Newsboy Cap', 'This great and glorious Newsboy cap will let your rodent personally relive the wonder that is the Newsies.', 4, 2.75, 'https://i.etsystatic.com/10078000/r/il/a93efe/840970766/il_794xN.840970766_i0px.jpg', 1, '2020-02-05'),
(4,4, 'Feathred Tricorn', 'Your pet can be a real dandy in this fancy tricorn hat!', 5, 5.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1vO3zPl7bM-7WKCYIKgTMnRLn0CZan89Fu_ReekeZkm4vzJim&usqp=CAU', 1, '2020-02-10'),
(2,1, 'Party Puff', 'Your lizard can celebrate in style with this fancy party hat with a pom-pom-puff on top!', 10, 1.50, 'https://66.media.tumblr.com/513166352afb946907f99349f0d9acaf/tumblr_phdkmat8Xe1roatlio1_400.jpg', 1, '2020-02-15'),
(3,2, 'Baianas Hat', 'Now your dog can be as fabulous as Carmen Miranda with this fabulous fruit hat!', 8, 10.00, 'https://i.pinimg.com/originals/e3/a9/50/e3a950861044c66d980420ddd8620ac2.jpg', 1, '2020-03-20'),
(3,3, 'Bananacat', 'I AM A BANANA!', 7, 3.50, 'https://images-na.ssl-images-amazon.com/images/I/81IJO%2BvidLL._AC_SX466_.jpg', 1, '2020-04-23'),
(5,3, 'Flamingo Hat', 'Turn your kitty into the cutest pink flamingo ever!', 6, 4.25, 'https://images-na.ssl-images-amazon.com/images/I/51tL58Qn1LL._AC_SL1002_.jpg', 1, '2020-03-16'),
(5,3, 'Tin Foil Hat', 'Tin foil hat for the catspiracy theoriests!', 8, 7.50, 'https://i.ytimg.com/vi/Tv7XXs0ta9s/hqdefault.jpg', 1, '2020-05-10'),
(1,2, 'Uncle Sam', 'Celebrate Merica with this classy Uncle Sam hat!', 6, 1.25, 'https://pbs.twimg.com/media/DD_sRHVUIAAj7fD.jpg', 1, '2020-06-02'),
(4,2, 'Chocolate Top Hat', 'Your doggo can feel like part of a Jane Austen novel with this fancy chocolate-colored top hat!', 10, 8.50, 'https://66.media.tumblr.com/1fc39e12bbfe0c06fd9756c8e9954fcb/tumblr_pive52I9pB1ugckyro1_500.gifv', 1, '2020-03-19'),
(1,1, 'Snakey Sssombrero', 'Nothing says Fiessssta like a snake in a ssssombrero!', 9, 1.75, 'https://i.ytimg.com/vi/uWII5pu3uI4/hqdefault.jpg', 1, '2020-03-05'),
(2,1, 'Snakey Party Hats', 'Celebrate your parties in SSssstyle with this fancy snakey party hats!', 6, 1.25, 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/5/11/enhanced/webdr14/enhanced-20343-1452012379-6.png?downsize=700%3A%2A&output-quality=auto&output-format=auto', 1, '2020-05-17'),
(5,5, 'Horsing Around Baseball Cap', 'Your horse will not say NEIGH to wearint this spectacular baseball hat!', 5, 6.50, 'https://media1.s-nbcnews.com/i/MSNBC/Components/Slideshows/_production/ss-140403-horse-hats/Carnsdale%20Topgun%20wears%20Ohio%202.jpg', 1, '2020-02-19'),
(2,1, 'Donkey Bonnet', 'Your beautiful donkey can look extra classy in this fancy sun bonnet!', 7, 12.50, 'https://i.pinimg.com/736x/14/3a/6e/143a6ece70beb37a07b8b7cda512ab77.jpg', 1, '2020-04-09'),
(1,4, 'Tiny Santa Hat', 'Guess who is coming down the chimney?', 10, 1.00, 'https://images.assetsdelivery.com/compings_v2/singaevskagalina/singaevskagalina1912/singaevskagalina191200001.jpg', 1, '2020-04-10'),
(1,4, 'Jester Hat', 'Celebrate Mardi Gras in style with this fancy ferret jester hat!', 5, 10.50, 'https://www.marshallferrets.com/mm5/graphics/00000001/FW-334.jpg', 1, '2020-03-05'),
(4,2, 'Doggo Top Hat', 'Your doggo can show up to his events in style with this super dapper top hat!', 10, 12.75, 'https://media-api.xogrp.com/images/2e64a6a2-acbe-474a-997d-76e831ab6afe~rs_768.h', 1, '2020-05-25'),
(5,1, 'Youre a Lizzard, Harry', 'Your Lizzard can be the top Wizard at his school of witchcraft and wizardry!', 8, 7.50, 'https://external-preview.redd.it/KcE-g98duL6yiWWxpnm9PZQq2Km43zm5q_c3azrlfy4.jpg?auto=webp&s=3ec61316da752d80575160e081add9a05b45d23c', 1, '2020-04-06'),
(2,3, 'Cooking Cap', 'Your furry little chef can get cooking with this fancy crochetted chef hat and scarf combo!', 4, 20.50, 'https://i.imgur.com/SUixQTS.jpg', 1, '2020-04-28'),
(4,5, 'Dapper Goat', 'A dapper hat for a dapper goat!', 4, 18.50, 'https://i.imgur.com/Ww9omED.png', 1, '2020-05-05')
​
​
SELECT * FROM Products