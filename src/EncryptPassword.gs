function encryptPassword(password) {
  // Initialize parameters
  var algorithm = Utilities.DigestAlgorithm.SHA_256;
  var charset = Utilities.Charset.UTF_8;

  // Generate a random position within the password length
  var position = Math.floor(Math.random() * password.length);

  // Split the password into two parts at the random position
  var part1 = password.substring(0, position);
  var part2 = password.substring(position);

  // Generate a random salt
  var salt = generateRandomSalt();

  // Create salted password string by combining the two parts and inserting the salt
  var saltedPassword = part1 + salt + part2;

  // Generate hash for salted password
  var hash = Utilities.computeDigest(algorithm, saltedPassword, charset);
  var hexHash = toHex(hash);

  return {
    salt: salt,
    hash: hexHash,
    saltPosition: position
  };
}

// function toHex(byteArray) {
//   var hex = "";
//   for (var i = 0; i < byteArray.length; i++) {
//     hex += (byteArray[i] >>> 4).toString(16) + (byteArray[i] & 0xf).toString(16);
//   }
//   return hex;
// }


function toHex(byteArray) {
  var hexArray = [];
  for (var i = 0; i < byteArray.length; i++) {
    var hex = (byteArray[i] & 0xff).toString(16);
    hex = hex.length === 1 ? "0" + hex : hex;
    hexArray.push(hex);
  }
  return hexArray.join("");
}

function generateRandomSalt() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var minLength = 32;
  var maxLength = 64;
  var saltLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  var salt = '';
  
  for (var i = 0; i < saltLength; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    salt += characters.charAt(randomIndex);
  }
  
  return salt;
}
