import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create sample employees
  const employees = await Promise.all([
    prisma.employee.upsert({
      where: { employeeId: 'EMP001' },
      update: {},
      create: {
        employeeId: 'EMP001',
        name: 'John Doe',
      },
    }),
    prisma.employee.upsert({
      where: { employeeId: 'EMP002' },
      update: {},
      create: {
        employeeId: 'EMP002',
        name: 'Jane Smith',
      },
    }),
    prisma.employee.upsert({
      where: { employeeId: 'EMP003' },
      update: {},
      create: {
        employeeId: 'EMP003',
        name: 'Bob Johnson',
      },
    }),
    prisma.employee.upsert({
      where: { employeeId: 'EMP004' },
      update: {},
      create: {
        employeeId: 'EMP004',
        name: 'Alice Williams',
      },
    }),
    prisma.employee.upsert({
      where: { employeeId: 'EMP005' },
      update: {},
      create: {
        employeeId: 'EMP005',
        name: 'Charlie Brown',
      },
    }),
  ])

  console.log(`Created ${employees.length} employees`)

  // Create sample tables
  const tables = await Promise.all([
    prisma.table.upsert({
      where: { tableNumber: '1' },
      update: {},
      create: {
        tableNumber: '1',
        capacity: 4,
      },
    }),
    prisma.table.upsert({
      where: { tableNumber: '2' },
      update: {},
      create: {
        tableNumber: '2',
        capacity: 4,
      },
    }),
    prisma.table.upsert({
      where: { tableNumber: '3' },
      update: {},
      create: {
        tableNumber: '3',
        capacity: 6,
      },
    }),
    prisma.table.upsert({
      where: { tableNumber: '4' },
      update: {},
      create: {
        tableNumber: '4',
        capacity: 4,
      },
    }),
    prisma.table.upsert({
      where: { tableNumber: '5' },
      update: {},
      create: {
        tableNumber: '5',
        capacity: 2,
      },
    }),
  ])

  console.log(`Created ${tables.length} tables`)
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

