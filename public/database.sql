CREATE TABLE User(
	userId int(100) PRIMARY KEY AUTO_INCREMENT,
	userName Varchar(125) not null,
	userPassword Varchar(125) not null,
	email Varchar(50) not null,
	sex Varchar(5) DEFAULT '保密',
	regTime TIMESTAMP  not null DEFAULT NOW(),
	phone Varchar(15),
	qq Varchar(15)
);

CREATE TABLE Good(
	goodId int(100) PRIMARY KEY AUTO_INCREMENT,
	userId int(100) not null,
	goodName Varchar(50) not null,
	goodPrice int(30) not null,
	goodType Varchar(30) not null,
	goodDesc Varchar(125) not null,
	goodHit int(100) not null DEFAULT 0,
	ReleaseTime TIMESTAMP not null DEFAULT NOW(),
	ifFinish boolean DEFAULT false,
	FOREIGN KEY (userId) REFERENCES User(userId)
);
CREATE TABLE goodConcerned(
	concernedId int(125) PRIMARY KEY AUTO_INCREMENT,
	goodId int(100) not null,
	userId int(100) not null,
	concernedTime TIMESTAMP not null DEFAULT NOW(),
	FOREIGN KEY (goodId) REFERENCES Good(goodId),
	FOREIGN KEY (userId) REFERENCES User(userId)
);
CREATE TABLE goodImg(
	imgId int(100) PRIMARY KEY AUTO_INCREMENT,
	goodId int(100) not null,
	imgUrl Varchar(80) not null,
	FOREIGN KEY (goodId) REFERENCES Good(goodId)
);
CREATE TABLE goodComment(
	commentId int(100) PRIMARY KEY AUTO_INCREMENT,
	goodOwnerId int(100) not null,
	ifRead boolean not null DEFAULT false,
	commentOwnerId int(100) not null,
	goodId int(100) not null,
	content Varchar(200) not null,
	giveTime TIMESTAMP not null DEFAULT NOW(),
	FOREIGN KEY (goodOwnerId) REFERENCES User(userId),
	FOREIGN KEY (commentId) REFERENCES User(userId),
	FOREIGN KEY (goodId) REFERENCES Good(goodId)
);
CREATE TABLE goodLable(
	lableId int(100) PRIMARY KEY AUTO_INCREMENT,
	goodId int(100) not null,
	content Varchar(50) not null,
	FOREIGN KEY (goodId) REFERENCES Good(goodId)
);