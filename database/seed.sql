-- Use the database
USE myDatabase;

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

-- Insert data into Interactions
INSERT INTO Interactions (UserID, ContentID, InteractionType)
VALUES (1, 2, 'Like'),
       (2, 3, 'Dislike'),
       (3, 1, 'Like');
