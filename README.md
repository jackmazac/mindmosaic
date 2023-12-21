# Tunify

Tunify is envisioned as a comprehensive digital platform that allows users to capture, categorize, and retrieve information across various media. It is designed to help users manage the plethora of content they interact with daily, including books, articles, podcasts, and videos. By leveraging a robust database and intuitive UI, Tunify serves as an intellectual tool that augments memory and facilitates the recall of information.

# Database

TODO: DEFINE SCHEMA HERE

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Create database by running `sqlite3 tunify.db < init.sql`.
5. Populate database by running  `sqlite3 tunify.db < seed.sql`.
6. Start Express server by running `node server/server.js`.
7. Start React client by running  `npm start`
8. Navigate in browser to http://localhost:3000/