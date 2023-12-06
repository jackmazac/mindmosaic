# Tunify

Tunify is envisioned as a comprehensive digital platform that allows users to capture, categorize, and retrieve information across various media. It is designed to help users manage the plethora of content they interact with daily, including books, articles, podcasts, and videos. By leveraging a robust database and intuitive UI, Tunify serves as an intellectual tool that augments memory and facilitates the recall of information.

## Functionality

The application will allow users to:
- Automatically capture data from integrations with platforms such as YouTube, Spotify, and others.
- Manage and query metadata associated with their content.
- Conduct advanced searches with multiple parameters.
- Interact with other users to compare and discuss content.

## Front-End Technology

For the front-end UI, we plan to use React. React's component-based architecture will allow us to create a dynamic and responsive user interface. 

## Back-End Database

As per the project requirements, the back-end will be powered by MySQL. This database system will be used to store, manage, and retrieve all user data and interactions within the application.

## Database Tables

- Users: Stores user account information.
- Content_Interactions: Records each interaction a user has with content.
- Content_Metadata: Holds metadata for each piece of content.
- User_Preferences: Captures individual user settings and preferences.
- Social_Interactions: Logs social interactions, such as discussions between users about content.

## Additional Considerations

- The application will include features for creating, reading, updating, and deleting records, with a soft-delete functionality for data retention policies.
- We will implement transactions with commit and rollback to ensure data integrity.
- Queries will be designed to include aggregation/group-by, subqueries, and multi-table joins to fulfill the project's requirements.
- Database views and indexes will be utilized to optimize query performance and data retrieval.
- All tables will enforce referential integrity with primary and foreign key constraints.
- The database schema will be normalized to the 3rd normal form, and we will document all functional dependencies. 
## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Start the server by running `npm start`.
5. The server will start running on `http://localhost:5000`.
6. To setup the database, navigate to the `database` directory.
7. Run the `init.sql` file to create the database and tables.
8. Run the `seed.sql` file to populate the tables with initial data.

Note: Make sure you have Node.js and MySQL installed on your machine.
