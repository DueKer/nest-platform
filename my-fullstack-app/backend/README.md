# My Fullstack App - Backend

This is the backend part of the My Fullstack App project, built using NestJS.

## Getting Started

To get started with the backend, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-fullstack-app/backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm run start
   ```

   The application will start on `http://localhost:3000` by default.

## Project Structure

- `src/main.ts`: Entry point of the application.
- `src/app.module.ts`: Root module that imports other modules and controllers.
- `src/controllers/app.controller.ts`: Contains the AppController class with the getHello method for handling requests to the root route.

## Scripts

- `npm run start`: Starts the application in development mode.
- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm run test`: Runs the tests for the application.

## License

This project is licensed under the MIT License. See the LICENSE file for details.