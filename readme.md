# Manthan Backend API

## A backend REST API for the Manthan platform. It provides endpoints for students to anonymously submit tips, check in with their moods, and discover helpful resources.

## Technologies Used
* **Node.js & Express:** Used to handle routing and API logic.
* **SQLite:** Used for persistent data storage without requiring a standalone database server.

## Installation and Running
1. Open your terminal in the project directory.
2. Run `npm install` to install Express and SQLite3.
3. Run `npm start` to launch the server on port 3000. 

## Database Configuration
No extra configuration is needed. SQLite automatically creates a local file named `manthan.db` in the root folder to persist data when the server runs for the first time. The `database.js` file handles the table creation and seeds dummy resources.

## Available Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/tips` | Submit an anonymous tip (requires `message`). |
| GET | `/tips` | Retrieve all anonymous tips. |
| POST | `/moods` | Record a mood. Allowed: good, okay, meh, stressed, overwhelmed. |
| GET | `/moods` | Retrieve all mood entries. |
| GET | `/resources` | Retrieve all student resources. |
| GET | `/resources?category=X`| Filter resources by category (e.g., `academic`). |

## Assumptions Made
* Dates are stored as simple strings in `YYYY-MM-DD` format.
* Validation enforces that empty tips and incorrect mood strings return a `400 Bad Request` status code.
