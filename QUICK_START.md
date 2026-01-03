# Quick Start Guide

## Prerequisites

Make sure you have Node.js installed (version 18 or higher).

## Installation & Setup

### 1. Install Dependencies

```bash
cd table-assignment-app
npm install
```

### 2. Set Up Database

The `.env` file is already created with the database URL. Now initialize the database:

```bash
# Generate Prisma Client
npm run db:generate

# Create database and tables
npm run db:push
```

### 3. Seed Sample Data (Optional)

Add some sample employees and tables:

```bash
npm run db:seed
```

This will create:
- 5 sample employees (EMP001-EMP005)
- 5 sample tables (1-5)

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using the App

1. **Select Employee ID**: Choose an employee from the dropdown
2. **Select Table Number**: Choose a table from the dropdown
3. **Click "Assign Table"**: The assignment will be created and shown in the assignments list
4. **View Assignments**: See all current active assignments in the table below
5. **Cancel Assignment**: Click "Cancel" next to any assignment to remove it

## Adding More Employees/Tables

### Option 1: Using Prisma Studio (GUI)

```bash
npm run db:studio
```

This opens a web interface where you can add/edit employees and tables.

### Option 2: Using API (curl/Postman)

**Add Employee:**
```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"employeeId": "EMP006", "name": "New Employee"}'
```

**Add Table:**
```bash
curl -X POST http://localhost:3000/api/tables \
  -H "Content-Type: application/json" \
  -d '{"tableNumber": "6", "capacity": 4}'
```

## Troubleshooting

### Database not found
Run `npm run db:push` to create the database file.

### Port already in use
Change the port by running: `PORT=3001 npm run dev`

### Prisma Client not generated
Run `npm run db:generate`

## Next Steps

- Customize the UI styling in `app/globals.css`
- Add more validation rules in the API routes
- Extend the data model in `prisma/schema.prisma`

