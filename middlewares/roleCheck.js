const response = require('../middlewares/response');
const isCustomer = (req, res) => {
    // const user = req.user;
    if (req.user.role !== 'CUSTOMER') {
        return response.validationError(res,"Cutomer login required")
    }
    next()

}

const isOrganization = (req, res) => {
  // const user = req.user;
  if (req.user.role !== "ORGANIZER") {
    return response.validationError(res, "Organizer login required");
  }
  next();
};