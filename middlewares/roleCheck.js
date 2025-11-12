const response = require('../middlewares/response');
const isCustomer = (req, res, next) => {
  // const user = req.user;
  if (req.user.role !== 'CUSTOMER') {
    return response.validationError(res, "Customer login required")
  }
  next()

};

const isOrganization = (req, res,next) => {
  // const user = req.user;
  if (req.user.role !== "ORGANIZER") {
    return response.validationError(res, "Organizer login required");
  }
  next();
};
module.exports = { isCustomer, isOrganization };