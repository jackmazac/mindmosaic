-- Create database
CREATE DATABASE myDatabase;

-- Use the created database
USE myDatabase;

-- Create tables
CREATE TABLE Users (
    ID INT AUTO_INCREMENT,
    Username VARCHAR(50),
    Email VARCHAR(50),
    Password VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE Content (
    ID INT AUTO_INCREMENT,
    UserID INT,
    Content VARCHAR(255),
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Interactions (
    ID INT AUTO_INCREMENT,
    UserID INT,
    ContentID INT,
    InteractionType VARCHAR(50),
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (ContentID) REFERENCES Content(ID)
);
