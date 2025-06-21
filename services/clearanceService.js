// Clearance Service (MongoDB interaction)
const Clearance = require("../models/Clearance");

const getAllClearanceRequests = async () => {
  return await Clearance.find();
};

const approveClearanceRequest = async (id, comment) => {
  return await Clearance.findByIdAndUpdate(
    id,
    { status: "approved", ...(comment && { comment }) },
    { new: true }
  );
};

const rejectClearanceRequest = async (id, comment) => {
  return await Clearance.findByIdAndUpdate(
    id,
    { status: "rejected", ...(comment && { comment }) },
    { new: true }
  );
};

module.exports = {
  getAllClearanceRequests,
  approveClearanceRequest,
  rejectClearanceRequest,
};