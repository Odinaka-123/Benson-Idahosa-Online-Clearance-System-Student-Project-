"use client"

import { useState } from "react"
import { CheckCircle, XCircle, User, FileText, Clock } from "lucide-react"
import LoadingSpinner from "../../src/components/shared/LoadingSpinner"

// Mock logged-in department head (replace with real auth in production)
const loggedInDepartment = "Computer Science"

// Mock data for student clearance requests
const mockRequests = [
  {
    id: "REQ-001",
    studentName: "Alice Johnson",
    matricNo: "U2021/12345",
    department: "Computer Science",
    requestDate: "2025-06-15T10:00:00Z",
    status: "pending",
    documentUrl: "https://example.com/docs/clearance-req-001.pdf",
  },
  {
    id: "REQ-002",
    studentName: "Bob Smith",
    matricNo: "U2021/54321",
    department: "Mathematics",
    requestDate: "2025-06-16T14:30:00Z",
    status: "pending",
    documentUrl: "https://example.com/docs/clearance-req-002.pdf",
  },
  {
    id: "REQ-003",
    studentName: "Carol Lee",
    matricNo: "U2021/67890",
    department: "Physics",
    requestDate: "2025-06-17T09:15:00Z",
    status: "pending",
    documentUrl: "https://example.com/docs/clearance-req-003.pdf",
  },
]

const ApprovalInterface = () => {
  const [requests, setRequests] = useState(mockRequests)
  const [loadingId, setLoadingId] = useState(null)

  // Only show requests for the logged-in department
  const filteredRequests = requests.filter(
    (req) => req.department === loggedInDepartment
  )

  const handleAction = (id, action) => {
    setLoadingId(id)
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: action === "approve" ? "approved" : "rejected" } : req
        )
      )
      setLoadingId(null)
    }, 1000) // Simulate API delay
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Clearance Requests</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matric No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-900">{req.studentName}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{req.matricNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{req.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {new Date(req.requestDate).toLocaleDateString()} <Clock className="inline w-4 h-4 ml-1 text-gray-400" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={req.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    <FileText className="w-4 h-4 mr-1" />View
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {req.status === "pending" && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                  {req.status === "approved" && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" /> Approved
                    </span>
                  )}
                  {req.status === "rejected" && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                      <XCircle className="w-4 h-4 mr-1" /> Rejected
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {req.status === "pending" ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAction(req.id, "approve")}
                        disabled={loadingId === req.id}
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs font-medium disabled:opacity-60"
                      >
                        {loadingId === req.id ? <LoadingSpinner size={16} /> : <CheckCircle className="w-4 h-4 mr-1" />}
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "reject")}
                        disabled={loadingId === req.id}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 text-xs font-medium disabled:opacity-60"
                      >
                        {loadingId === req.id ? <LoadingSpinner size={16} /> : <XCircle className="w-4 h-4 mr-1" />}
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="p-8 text-center text-gray-500">No clearance requests for your department.</div>
        )}
      </div>
    </div>
  )
}

export default ApprovalInterface
