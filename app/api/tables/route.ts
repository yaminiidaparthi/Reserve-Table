import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { tableNumber: 'asc' },
    })
    return NextResponse.json(tables)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tables' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tableNumber, capacity } = body

    if (!tableNumber) {
      return NextResponse.json(
        { error: 'Table Number is required' },
        { status: 400 }
      )
    }

    const table = await prisma.table.create({
      data: {
        tableNumber,
        capacity: capacity || null,
      },
    })

    return NextResponse.json(table, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Table Number already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create table' },
      { status: 500 }
    )
  }
}

