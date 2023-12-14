-- SQLite does not require CREATE DATABASE or USE statements

-- Users Table
CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    ProfileData TEXT
);

-- Artists Table
CREATE TABLE Artists (
    ArtistID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(255) NOT NULL,
    Biography TEXT
);

-- Albums Table
CREATE TABLE Albums (
    AlbumID INTEGER PRIMARY KEY AUTOINCREMENT,
    ArtistID INT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    ReleaseDate DATE,
    FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

-- Songs Table
CREATE TABLE Songs (
    SongID INTEGER PRIMARY KEY AUTOINCREMENT,
    AlbumID INT,
    Title VARCHAR(255) NOT NULL,
    Duration TIME,
    FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID)
);

-- Playlists Table
CREATE TABLE Playlists (
    PlaylistID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Favorites Table
CREATE TABLE Favorites (
    UserID INT NOT NULL,
    SongID INT NOT NULL,
    PRIMARY KEY (UserID, SongID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

-- User Interactions Table (for following and other interactions, simplified example)
CREATE TABLE UserInteractions (
    UserID_1 INT NOT NULL,
    UserID_2 INT NOT NULL,
    InteractionType VARCHAR(255),
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID_1) REFERENCES Users(UserID),
    FOREIGN KEY (UserID_2) REFERENCES Users(UserID),
    PRIMARY KEY (UserID_1, UserID_2, InteractionType)
);

-- Indexes for optimization (examples)
CREATE INDEX idx_artist_name ON Artists(Name);
CREATE INDEX idx_album_title ON Albums(Title);
CREATE INDEX idx_song_title ON Songs(Title);
CREATE INDEX idx_playlist_name ON Playlists(Name);
