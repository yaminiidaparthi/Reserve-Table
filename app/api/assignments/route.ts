import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      where: {
        status: 'active',
      },
      include: {
        employee: true,
        table: true,
      },
      orderBy: { assignedAt: 'desc' },
    })
    return NextResponse.json(assignments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { employeeId, tableNumber } = body

    if (!employeeId || !tableNumber) {
      return NextResponse.json(
        { error: 'Employee ID and Table Number are required' },
        { status: 400 }
      )
    }

    // Check if employee exists
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
    })

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      )
    }

    // Check if table exists
    const table = await prisma.table.findUnique({
      where: { tableNumber },
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Table not found' },
        { status: 404 }
      )
    }

    // Check if there's already an active assignment for this employee
    const existingEmployeeAssignment = await prisma.assignment.findFirst({
      where: {
        employeeId,
        status: 'active',
      },
    })

    if (existingEmployeeAssignment) {
      return NextResponse.json(
        { error: 'Employee already has an active table assignment' },
        { status: 409 }
      )
    }

    // Check if table is already assigned
    const existingTableAssignment = await prisma.assignment.findFirst({
      where: {
        tableNumber,
        status: 'active',
      },
    })

    if (existingTableAssignment) {
      return NextResponse.json(
        { error: 'Table is already assigned to another employee' },
        { status: 409 }
      )
    }

    // Create assignment
    const assignment = await prisma.assignment.create({
      data: {
        employeeId,
        tableNumber,
        status: 'active',
      },
      include: {
        employee: true,
        table: true,
      },
    })

    return NextResponse.json(assignment, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Assignment already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    )
  }
}

