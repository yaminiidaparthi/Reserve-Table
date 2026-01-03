import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    const assignment = await prisma.assignment.update({
      where: { id },
      data: { status: 'cancelled' },
    })

    return NextResponse.json(assignment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to cancel assignment' },
      { status: 500 }
    )
  }
}

