DROP DATABASE IF EXISTS eBooks;



CREATE DATABASE eBooks;



USE eBooks;



CREATE TABLE Books

(

	Book_ref 		varchar(10) NOT NULL PRIMARY KEY,

	Book_title 	varchar(60) NOT NULL,

	Book_price 	decimal(6,2) NOT NULL,

	Book_formats 	varchar(20) NOT NULL

);



INSERT INTO Books VALUES('F001'	,'The Crystal Sword Book 1 The Legacy',	3.99,'EPUB, MOBI, AZF');

INSERT INTO Books VALUES('F002'	,'The Crystal Sword Book 2 Lost Dreams',3.99,'EPUB, MOBI, AZF');

INSERT INTO Books VALUES('F003'	,'The Crystal Sword Book 3 Dreams Regained',3.99,'EPUB, MOBI, AZF');

INSERT INTO Books VALUES('F004'	,'The Crystal Sword Book 4 Crystal Reforged',3.99,'EPUB, MOBI');

INSERT INTO Books VALUES('SF005','Thoughts of the Future  An Anthology of Science Fiction',4.20	,'EPUB, MOBI');

INSERT INTO Books VALUES('F006'	,'The Unborn Mage',2.99,'EPUB');

INSERT INTO Books VALUES('SF007','Star Marine Corps',3.99,'EPUB, MOBI');

INSERT INTO Books VALUES('F008','Apprenticed to a Mad Sorcerer',3.50,'EPUB');

INSERT INTO Books VALUES('SF009','Mutiny on the Starship Bounty',4.99,'EPUB, MOBI, AZF');

INSERT INTO Books VALUES('NF010','What is Particle Physics anyway?  A Beginners Guide',10.99,'EPUB, MOBI, AZF');

INSERT INTO Books VALUES('NF011','Beyond the Stars  An Introduction to AstroPhysics',11.99,'EPUB, MOBI, AZF');

INSERT INTO Books VALUES('SF012','Ensign Drake and the Space Frigate Audacious',2.99,'EPUB, MOBI');

INSERT INTO Books VALUES('SF013','Lieutenant Drake and the Space Pirates',2.99,'EPUB, MOBI');

INSERT INTO Books VALUES('SF014','Captain Drake and his First Command',2.99,'EPUB, MOBI');




CREATE TABLE Members

(

	Member_id 	int 		NOT NULL PRIMARY KEY,

	Member_name 	varchar(30) 	NOT NULL

);



INSERT INTO Members VALUES(1212,'John Brown');

INSERT INTO Members VALUES(1213,'Sarah Jones');

INSERT INTO Members VALUES(1263,'Ranjit Singh');

INSERT INTO Members VALUES(1154,'Gertrude Smith');

INSERT INTO Members VALUES(1223,'Eliza Sanchez');

INSERT INTO Members VALUES(1255,'Ken Hom');




CREATE TABLE Orders

(

	Download_id 	int auto_increment 	NOT NULL PRIMARY KEY,

	Order_id 		int 		NOT NULL, /* Always set to one higher than previous max */

	Order_date 	datetime 		NOT NULL,

	Book_ref 		varchar(10) 	NOT NULL,

	Book_price 	decimal(6,2)	NOT NULL,

	Formats_ordered	varchar(20) 	NOT NULL,

	Member_id 	int		NOT NULL,

	FOREIGN KEY ( Member_id ) 		REFERENCES Members ( Member_id ),

	FOREIGN KEY ( Book_ref ) 		REFERENCES BOOKS ( Book_ref )

);