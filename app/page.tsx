'use client'

import { useState, useEffect } from 'react'

interface Employee {
  id: string
  employeeId: string
  name: string | null
}

interface Table {
  id: string
  tableNumber: string
  capacity: number | null
}

interface Assignment {
  id: string
  employeeId: string
  tableNumber: string
  assignedAt: string
  employee: Employee
  table: Table
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('')
  const [selectedTableNumber, setSelectedTableNumber] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchEmployees()
    fetchTables()
    fetchAssignments()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees')
      const data = await response.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables')
      const data = await response.json()
      setTables(data)
    } catch (error) {
      console.error('Error fetching tables:', error)
    }
  }

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/assignments')
      const data = await response.json()
      setAssignments(data)
    } catch (error) {
      console.error('Error fetching assignments:', error)
    }
  }

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedEmployeeId || !selectedTableNumber) {
      setMessage({ type: 'error', text: 'Please select both Employee ID and Table Number' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: selectedEmployeeId,
          tableNumber: selectedTableNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create assignment')
      }

      setMessage({ type: 'success', text: `Successfully assigned Table ${selectedTableNumber} to Employee ${selectedEmployeeId}` })
      setSelectedEmployeeId('')
      setSelectedTableNumber('')
      fetchAssignments()
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create assignment' })
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAssignment = async (assignmentId: string) => {
    if (!confirm('Are you sure you want to cancel this assignment?')) {
      return
    }

    try {
      const response = await fetch(`/api/assignments/${assignmentId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to cancel assignment')
      }

      setMessage({ type: 'success', text: 'Assignment cancelled successfully' })
      fetchAssignments()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cancel assignment' })
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50 relative overflow-hidden">
      {/* Background image with 70% opacity - People having food/not working */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80")',
          opacity: 0.7,
          zIndex: 0
        }}
      />
      <div className="relative z-10 w-[70%] mx-auto">

        {/* Assignment Form */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-md p-6 mb-8">
          {/* Table Icon - Colored & Filled with light gray border */}
          <div className="flex justify-center mb-4">
            <div className="border-2 border-gray-300 rounded-lg p-2">
              <svg 
                className="w-16 h-16" 
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
              {/* Table top */}
              <rect x="8" y="20" width="48" height="8" fill="#2563eb" rx="2"/>
              {/* Table legs */}
              <rect x="12" y="28" width="4" height="20" fill="#1e40af"/>
              <rect x="48" y="28" width="4" height="20" fill="#1e40af"/>
              <rect x="12" y="48" width="40" height="4" fill="#1e40af"/>
              {/* Chairs around table */}
              <circle cx="8" cy="24" r="3" fill="#3b82f6"/>
              <circle cx="56" cy="24" r="3" fill="#3b82f6"/>
              <circle cx="32" cy="12" r="3" fill="#3b82f6"/>
              <circle cx="32" cy="36" r="3" fill="#3b82f6"/>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Reserve Table For Lunch</h2>
          
          {message && (
            <div className={`mb-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAssign} className="space-y-4">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Employee ID
              </label>
              <select
                id="employeeId"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className={`w-full py-2 pl-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-[#f5f5f5] transition-colors ${!selectedEmployeeId ? 'text-[#B3B3B3]' : 'text-gray-900'}`}
                style={{ paddingRight: '48px', paddingLeft: '16px' }}
                required
              >
                <option value="" style={{ color: '#B3B3B3' }}>Select Employee ID</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.employeeId}>
                    {employee.employeeId} {employee.name ? `- ${employee.name}` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Select Table Number
              </label>
              <select
                id="tableNumber"
                value={selectedTableNumber}
                onChange={(e) => setSelectedTableNumber(e.target.value)}
                className={`w-full py-2 pl-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-[#f5f5f5] transition-colors ${!selectedTableNumber ? 'text-[#B3B3B3]' : 'text-gray-900'}`}
                style={{ paddingRight: '48px', paddingLeft: '16px' }}
                required
              >
                <option value="" style={{ color: '#B3B3B3' }}>Select Table Number</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.tableNumber}>
                    Table {table.tableNumber} {table.capacity ? `(${table.capacity} seats)` : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Reserving...' : 'Reserve Table'}
            </button>
          </form>
        </div>

        {/* Current Assignments */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-300">Tables Blocked</h2>
          
          {assignments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No active assignments</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Table Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {assignment.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.employee.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.tableNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(assignment.assignedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleCancelAssignment(assignment.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

