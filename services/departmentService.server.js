// This file was renamed to prevent accidental client-side imports of backend-only code.
// If you need backend Mongoose logic, import from this file on the server only.

const Department = require("../models/Department");

const getAllDepartments = async () => {
  return await Department.find();
};

const getDepartmentById = async (id) => {
  return await Department.findById(id);
};

const updateDepartment = async (id, data) => {
  return await Department.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
};
