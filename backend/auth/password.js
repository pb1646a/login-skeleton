const crypto = require("crypto");

let sha512 = (password, salt) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value
  };
};
const genRandomString = length => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  };

function authenticateUser(user, password) {
  let passwordCompare = saltHashPassword(password, user.passwordSalt);
  if (user.passwordHash === passwordCompare.passwordHash) {
    return true;
  }
}
function saltHashPassword(userPassword) {
  let salt = genRandomString(16);
  let passwordData = sha512(userPassword, salt);
  return passwordData;
}

module.exports={
saltHashPassword: saltHashPassword,
authUser : authenticateUser

}
