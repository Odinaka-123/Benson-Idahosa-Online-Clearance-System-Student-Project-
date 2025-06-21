const express = require("express");
const departmentService = require("../services/departmentService");
const clearanceService = require("../services/clearanceService");
const router = express.Router();

// Fetch all departments
router.get("/departments", async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch a department profile by ID
router.get("/departments/:id", async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    if (!department) return res.status(404).json({ error: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a department profile
router.put("/departments/:id", async (req, res) => {
  try {
    const updated = await departmentService.updateDepartment(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Department not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all clearance requests
router.get("/clearance-requests", async (req, res) => {
  try {
    const requests = await clearanceService.getAllClearanceRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve a clearance request
router.patch("/clearance-requests/:id/approve", async (req, res) => {
  try {
    const request = await clearanceService.approveClearanceRequest(req.params.id, req.body.comment);
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject a clearance request
router.patch("/clearance-requests/:id/reject", async (req, res) => {
  try {
    const request = await clearanceService.rejectClearanceRequest(req.params.id, req.body.comment);
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
