module.exports = function validateStatus(status) {
    const valid = ["pending", "in-progress", "completed"];
    return valid.includes(status);
  };
  