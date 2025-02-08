# Event Management Platform

## Project Description

The Event Management Platform is a full-stack web application designed to facilitate the creation, management, and attendance of various events. It provides a user-friendly interface for event organizers to create and manage events, while allowing attendees to discover and join events that interest them.

Key Features:
- User authentication (register, login, guest login)
- Event dashboard with filtering options
- Event creation and management
- Responsive design for seamless use across devices


## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (v4.4 or later)

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a `.env` file in the backend directory with the following content:
   \`\`\`
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   \`\`\`
   Replace `your_mongodb_connection_string` with your MongoDB connection URI and `your_jwt_secret` with a secure random string.


4. Start the backend server:
   \`\`\`
   npm start
   \`\`\`
   For development with auto-reloading:
   \`\`\`
   npm run dev
   \`\`\`

The backend server should now be running on `http://localhost:5001`.

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a `.env` file in the frontend directory:
   \`\`\`
   REACT_APP_BACKEND_URL=http://localhost:5001
   \`\`\`

4. Start the frontend development server:
   \`\`\`
   npm start
   \`\`\`

The frontend application should now be running on `http://localhost:5173`.



- ESLint and Prettier are set up for code linting and formatting. Run `npm run lint` in either directory to check for issues.
- Husky is configured for pre-commit hooks to ensure code quality. Make sure to run `npm install` in the root directory to set it up.

For more detailed instructions on setting up your development environment, please refer to the CONTRIBUTING.md file.

