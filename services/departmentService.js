// Department Service (Node backend, MongoDB interaction)
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
