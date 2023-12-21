# Tunify

Tunify is envisioned as a comprehensive digital platform that allows users to capture, categorize, and retrieve information across various media. It is designed to help users manage the plethora of content they interact with daily, including books, articles, podcasts, and videos. By leveraging a robust database and intuitive UI, Tunify serves as an intellectual tool that augments memory and facilitates the recall of information.

## Database

- Users Table: This table stores information about the users of the application. It includes fields like UserID (a unique identifier for each user), Username, Email, Password, Salt (for password security), and ProfileData (which can store additional user information).
- Content Table: This table links to the Users table and is used for storing content created or uploaded by the users. Each entry has a ContentID, UserID (linking to the Users table), and the Content text itself.
- Artists Table: Dedicated to storing information about music artists. It includes an ArtistID, Name, and Biography for each artist.
- Albums Table: This table contains information about music albums. Each record includes an AlbumID, ArtistID (linking to the Artists table), Title, and ReleaseDate.
- Songs Table: Here, individual songs are stored. Each song has a SongID, AlbumID (optional, linking to the Albums table), Title, Artist, Duration, and Album name. There's also a 'deleted' flag to mark if a song has been removed.
- Playlists Table: This table is for user-created playlists. It includes a PlaylistID, UserID (linking to the Users table), Name, and an optional Description.
- Favorites Table: This table tracks the songs that users have marked as favorites. It's a many-to-many relationship between Users and Songs, with UserID and SongID as composite primary keys.
- User Interactions Table: Designed for tracking interactions between users, like following. It includes UserID_1, UserID_2 (both referencing the Users table), InteractionType, and a Timestamp.
- Indexes: Finally, there are indexes created for optimizing queries related to artists, albums, songs, and playlists. These indexes help speed up searches in the database.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Create database by running `sqlite3 tunify.db < init.sql`.
5. Populate database by running  `sqlite3 tunify.db < seed.sql`.
6. Start Express server by running `node server/server.js`.
7. Start React client by running  `npm start`
8. Navigate in browser to http://localhost:3000/