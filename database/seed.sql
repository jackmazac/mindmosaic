-- Insert sample data into Users table
INSERT INTO Users (Username, Email, Password, ProfileData) VALUES
('john_doe', 'john.doe@example.com', 'password123', 'Johns Profile Info'),
('jane_doe', 'jane.doe@example.com', 'password456', 'Janes Profile Info');

-- Insert sample data into Content table
INSERT INTO Content (UserID, Content) VALUES
(1, 'Johns first post content here'),
(2, 'Janes first post content here');

-- Insert sample data into Artists table
INSERT INTO Artists (Name, Biography) VALUES
('The Beatles', 'Popular English rock band formed in Liverpool in 1960.'),
('Taylor Swift', 'American singer-songwriter known for narrative songs.');

-- Insert sample data into Albums table
INSERT INTO Albums (ArtistID, Title, ReleaseDate) VALUES
(1, 'Abbey Road', '1969-09-26'),
(2, 'Folklore', '2020-07-24');

-- Insert sample data into Songs table
INSERT INTO Songs (AlbumID, Title, Artist, Duration, Album) VALUES
(1, 'Come Together', 'The Beatles', '04:18', 'Abbey Road'),
(2, 'Cardigan', 'Taylor Swift', '04:00', 'Folklore');

-- Insert sample data into Playlists table
INSERT INTO Playlists (UserID, Name, Description) VALUES
(1, 'Johns Favorites', 'A collection of Johns favorite songs'),
(2, 'Janes Workout Playlist', 'Playlist for gym');

-- Insert sample data into Favorites table
INSERT INTO Favorites (UserID, SongID) VALUES
(1, 1),
(2, 2);

-- Insert sample data into UserInteractions table
INSERT INTO UserInteractions (UserID_1, UserID_2, InteractionType) VALUES
(1, 2, 'Follow'),
(2, 1, 'Follow');

-- Note: Adjust the sample data as needed for your application context.
