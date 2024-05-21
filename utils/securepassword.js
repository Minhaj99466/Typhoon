const bcrypt = require('bcrypt')


const securePassword = async (password) => {
  try {
    console.log(password);
    return  await bcrypt.hash(password,10);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = securePassword
