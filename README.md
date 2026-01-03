# Office Table Assignment App

A simple internal web application for assigning lunch tables to employees.

## Features

- Select Employee ID from a dropdown
- Select Table Number from a dropdown
- Assign table to employee
- View all current assignments
- Cancel assignments

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **SQLite** - Database (simple, file-based)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./prisma/dev.db"
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates database file)
npm run db:push
```

### 4. Seed Initial Data (Optional)

You can add initial employees and tables through the API or by using Prisma Studio:

```bash
npm run db:studio
```

Or create a seed script to add sample data.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
  ```json
  {
    "employeeId": "EMP001",
    "name": "John Doe"
  }
  ```

### Tables
- `GET /api/tables` - Get all tables
- `POST /api/tables` - Create table
  ```json
  {
    "tableNumber": "1",
    "capacity": 4
  }
  ```

### Assignments
- `GET /api/assignments` - Get all active assignments
- `POST /api/assignments` - Create assignment
  ```json
  {
    "employeeId": "EMP001",
    "tableNumber": "1"
  }
  ```
- `DELETE /api/assignments/[id]` - Cancel assignment

## Database Schema

- **Employee**: Stores employee information
- **Table**: Stores table information
- **Assignment**: Links employees to tables

## Adding Initial Data

You can add employees and tables using Prisma Studio:

```bash
npm run db:studio
```

Or use curl/Postman to call the API endpoints.

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

For production, consider:
- Using PostgreSQL instead of SQLite
- Adding environment variables for database connection
- Setting up proper backup strategies

## Notes

- This is an internal tool with no authentication
- SQLite database file is stored in `prisma/dev.db`
- The app prevents duplicate assignments (one employee = one table, one table = one employee)

