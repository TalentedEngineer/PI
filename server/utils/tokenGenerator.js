const { v4 : uuidv4 } = require("uuid");
const generateToken = () => {
  return uuidv4();
};

module.exports = generateToken;
