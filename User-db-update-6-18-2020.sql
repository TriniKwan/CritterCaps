-- do this first
ALTER TABLE [User]
ADD [UID] varchar(255)

ALTER TABLE [User]
ADD Email nvarchar(255)

-- then do this to update the database
UPDATE [User]
SET [UID] = 'oImYhRta50cxGNOUhBxc15wF8I73',
Email = 'theemileemitchell@gmail.com'
WHERE ID = 1

UPDATE [User]
SET [UID] = 'QVJAQAF2cFeeVUxRo5xOe6NwHlJ3',
Email = 'laura.e.collins1@gmail.com'
WHERE ID = 2

UPDATE [User]
SET [UID] = '5z9nlbNUAWXTUGo7FlWp2KwJCzz2',
Email = 'randytatejr@gmail.com'
WHERE ID = 3

UPDATE [User]
SET [UID] = 'Rxn5m5gejidNyBBs6xHU4yzMHC82',
Email = 'modjun12@gmail.com'
WHERE ID = 4

-- Add dummy admin account
INSERT INTO [User] (FirstName, LastName, AccountDate, Administrator, [UID], Email)
Values ('CritterCaps', 'Admin', '2020-06-18', 1, 'Jp7v3O9N96NeaCcka6EfBysv4HJ2', 'trinikwan.crittercaps@gmail.com')

select * from [User]