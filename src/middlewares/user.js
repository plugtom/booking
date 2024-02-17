const createError = require("../utils/createError");

const user = async (req, res, next) => {
  try {
    if (req.user.role !== "USER") {
      return createError(403, "Forbidden");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = user;
