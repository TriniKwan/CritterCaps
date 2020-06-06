-- Create order table
CREATE TABLE [Order] (
	OrderId int not null identity(1,1) primary key,
	UserId int foreign key references [User](Id),
	InvoiceDate DateTime not null,
	Total decimal(18,2),
	PaymentType int foreign key references PaymentType(PaymentId)
)

-- Create seed data

INSERT INTO [Order] (UserId, InvoiceDate, PaymentType)
values (2, '06-03-2020', 2), (3, '04-21-2020', 4), (1, '05-30-2020', 1)


-- Create line item table

CREATE TABLE LineItem (
	LineItemtId int not null identity(1,1) primary key,
	OrderId int foreign key references [Order](OrderId),
	ProductId int foreign key references Products(ProductId),
	UnitPrice decimal(18,2) not null,
	Quantity int not null
)

-- create seed data

insert into LineItem (OrderId, ProductId, UnitPrice, Quantity)
SELECT 1, 1, Products.Price, 1
FROM Products
WHERE ProductId = 1

insert into LineItem (OrderId, ProductId, UnitPrice, Quantity)
SELECT 1, 2, Products.Price, 1
FROM Products
WHERE ProductId = 2

insert into LineItem (OrderId, ProductId, UnitPrice, Quantity)
SELECT 2, 4, Products.Price, 1
FROM Products
WHERE ProductId = 4

insert into LineItem (OrderId, ProductId, UnitPrice, Quantity)
SELECT 3, 3, Products.Price, 1
FROM Products
WHERE ProductId = 3

insert into LineItem (OrderId, ProductId, UnitPrice, Quantity)
SELECT 3, 5, Products.Price, 1
FROM Products
WHERE ProductId = 5


-- view our work

SELECT *
FROM LineItem

SELECT * from [Order]

-- Create temp table for totals

CREATE TABLE #TempTotals(
OrderId int,
Total decimal(18,2)
)

-- Add totals into temp database

INSERT INTO #TempTotals (OrderId, Total)
SELECT OrderId, Sum(UnitPrice)
FROM LineItem
GROUP BY OrderId

-- update orders with totals

UPDATE [Order]
SET Total = T.Total
FROM #TempTotals T
WHERE T.OrderId = [Order].OrderId


SELECT * from [Order]	

