-- SQLite does not require a USE statement

-- Insert data into Users
INSERT INTO Users (Username, Email, Password)
VALUES ('user1', 'user1@example.com', 'password1'),
       ('user2', 'user2@example.com', 'password2'),
       ('user3', 'user3@example.com', 'password3');

-- Insert data into Content
INSERT INTO Content (UserID, Content)
VALUES (1, 'Content from user1'),
       (2, 'Content from user2'),
       (3, 'Content from user3');

-- Insert data into Artists
INSERT INTO Artists (Name, Biography)
VALUES ('Artist 1', 'Biography for Artist 1'),
       ('Artist 2', 'Biography for Artist 2');

-- Insert data into Albums
INSERT INTO Albums (ArtistID, Title, ReleaseDate)
VALUES (1, 'Album 1', '2022-01-01'),
       (2, 'Album 2', '2022-02-02');

-- Insert data into Songs
INSERT INTO Songs (AlbumID, Title, Duration)
VALUES (1, 'Song 1', '00:03:30'),
       (2, 'Song 2', '00:04:00');

-- Insert data into Playlists
INSERT INTO Playlists (UserID, Name, Description)
VALUES (1, 'Playlist 1', 'Description for Playlist 1'),
       (2, 'Playlist 2', 'Description for Playlist 2');

-- Insert data into Favorites
INSERT INTO Favorites (UserID, SongID)
VALUES (1, 1),
       (2, 2);

-- Insert data into UserInteractions
INSERT INTO UserInteractions (UserID_1, UserID_2, InteractionType)
VALUES (1, 2, 'Follow'),
       (2, 3, 'Follow'),
       (3, 1, 'Follow');
