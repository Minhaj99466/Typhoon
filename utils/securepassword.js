const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error.message);
  }
};

const comparePassword = async (dbPassword, haspassword) => {
  try {
    return await bcrypt.compare(dbPassword, haspassword);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  securePassword,
  comparePassword,
};
