"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useAuth } from "../../contexts/AuthContext"
import { useNotification } from "../../contexts/NotificationContext"
import LoadingSpinner from "../../src/components/shared/LoadingSpinner"
import {
  Search,
  User,
  Phone,
  Hash,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  AlertCircle,
  History,
  Filter,
} from "lucide-react"

// MOCK departmentService for development/testing
const departmentService = {
  getStudents: async (departmentId) => ({
    data: [
      { id: 1, firstName: "Jane", lastName: "Doe", matricNumber: "UCS2021001", phone: "09171234567", status: "pending", updatedAt: new Date().toISOString() },
      { id: 2, firstName: "John", lastName: "Smith", matricNumber: "UCS2021002", phone: "09179876543", status: "approved", updatedAt: new Date().toISOString() },
    ],
  }),
}

export default function StudentLookup() {
  // Use user instead of currentUser for Next.js AuthContext
  const { user } = useAuth()
  const { addNotification } = useNotification()

  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const response = await departmentService.getStudents(user?.departmentId || "mock-dept")
      setStudents(response.data)
      setFilteredStudents(response.data)
    } catch (err) {
      setError("Failed to fetch students")
      addNotification("Failed to fetch students", "error")
    } finally {
      setLoading(false)
    }
  }, [user, addNotification])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  useEffect(() => {
    const results = students.filter(student =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredStudents(results)
  }, [searchTerm, students])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Student Lookup</h1>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid gap-6">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white rounded-xl shadow-md flex items-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div className="ml-6 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-lg text-gray-900">{student.firstName} {student.lastName}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${student.status === "approved" ? "bg-green-100 text-green-700" : student.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{student.status}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-1">
                <span className="flex items-center"><Phone className="h-4 w-4 mr-1" />{student.phone}</span>
                <span className="flex items-center"><Hash className="h-4 w-4 mr-1" />{student.matricNumber || student.studentId || "-"}</span>
                <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : "-"}</span>
              </div>
            </div>
            <div>
              <Link href={`/students/${student.id}`} className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition-colors">View Details</Link>
            </div>
          </div>
        ))}
        {filteredStudents.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p>No students found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
