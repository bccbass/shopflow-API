# ShopFlow API

ShopFlow API is a backend service for managing leads, users, teachers, notes, repairs, and archives for a music school and shop. It provides endpoints for CRUD operations and authentication.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Leads](#leads)
  - [Users](#users)
  - [Teachers](#teachers)
  - [Notes](#notes)
  - [Repairs](#repairs)
  - [Archive](#archive)
  - [Utils](#utils)
- [Models](#models)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/ShopFlow-api.git
    cd ShopFlow-api
    ```

    Install dependencies:

    ```sh
    npm install
    ```

2. Set up environment variables by creating a .env file based on .env.sample:

    ```sh:
    Update the .env file with your configuration.
    ```

    Environment Variables

    ```sh
    ATLAS_DB_URL: MongoDB connection string.
    SHOPFLOW_API: ShopFlow API URL.
    SENDGRID_API_KEY: SendGrid API key for sending emails.
    JWT_SECRET: Secret key for JWT authentication.
    PORT: Port number for the server (default: 8080).
    ```

### Scripts

- start: Start the server.
- dev: Start the server with nodemon for development.
- seedleads: Seed the database with lead data.
- seednotes: Seed the database with note data.
- seedusers: Seed the database with user data.
- seedteachers: Seed the database with teacher data.
- seedarchive: Seed the database with archive data.
- seedutil: Seed the database with utility data.

### Endpoints

#### Auth

- POST /auth/login: Login a user.
- POST /auth/logout: Logout a user.
- GET /auth/me: Verify the logged-in user.

#### Leads

- GET /leads: Get all leads.
- GET /leads/analytics: Get lead analytics.
- GET /leads/due: Get due leads, notes, and repairs.
- POST /leads: Create a new lead.
- PATCH /leads/updatetrial/:id: Update trial information for a lead.
- PATCH /leads/updatefollowup/:id: Update follow-up information for a lead.
- GET /leads/:id: Get a lead by ID.
- PUT /leads/:id: Update a lead by ID.
- DELETE /leads/:id: Delete a lead by ID.
- DELETE /leads/archive/:id: Archive a lead.

#### Users

- GET /users: Get all users.
- POST /users: Create a new user.
- GET /users/:id: Get a user by ID.
- PATCH /users/:id: Update a user by ID.
- DELETE /users/:id: Delete a user by ID.

#### Teachers

- GET /teachers: Get all teachers.
- POST /teachers: Create a new teacher.
- GET /teachers/:id: Get a teacher by ID.
- PATCH /teachers/:id: Update a teacher by ID.
- DELETE /teachers/:id: Delete a teacher by ID.

#### Notes

- GET /notes: Get all notes.
- POST /notes: Create a new note.
- GET /notes/:id: Get a note by ID.
- PATCH /notes/:id: Update a note by ID.
- DELETE /notes/:id: Delete a note by ID.

#### Repairs

- GET /repairs: Get all repairs.
- POST /repairs: Create a new repair.
- GET /repairs/:id: Get a repair by ID.
- PATCH /repairs/:id: Update a repair by ID.
- DELETE /repairs/:id: Delete a repair by ID.

#### Archive

- GET /archive: Get all archived leads.
- DELETE /archive/reactivate/:id: Reactivate an archived lead.
- GET /archive/:id: Get an archived lead by ID.
- DELETE /archive/:id: Delete an archived lead by ID.

#### Utils

- GET /utils: Get utility information.
- POST /utils/message: Send a message using SendGrid.

#### Models

- Lead: Represents a lead.
- User: Represents a user.
- Teacher: Represents a teacher.
- Note: Represents a note.
- Repair: Represents a repair.
- Archive: Represents an archived lead.
- Util: Represents utility information.

License
This project is licensed under the MIT License.
