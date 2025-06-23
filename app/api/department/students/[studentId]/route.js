// Proxy for GET /api/department/students/[studentId]
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { studentId } = params;
  // Change the backend URL/port if needed
  const backendUrl = `http://localhost:5000/department/students/${studentId}`;
  try {
    const res = await fetch(backendUrl);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: "Proxy error", details: err.message }, { status: 500 });
  }
}
