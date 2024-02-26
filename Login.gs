function login(formData) {
  var ss = SpreadsheetApp.openById('1S6nn3A8M96TWePS3ah6eaZOy_gT8t0PiEO-AGLm_ato');
  var sheet = ss.getSheetByName('Users');
  
  var email = formData.email;
  var password = formData.password;

  // Cerca l'email nel foglio
  var data = sheet.getDataRange().getValues();
  var found = false;
  var savedHash = "";
  var savedSalt = "";
  var savedSaltPosition = "";

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === email) { // Controllo email (colonna 0)
      found = true;
      savedHash = data[i][3];
      savedSalt = data[i][4];
      savedSaltPosition = data[i][5];
      break;
    }
  }

  if (!found) {
    return { errors: [{ field: 'email' }] };
  }

  // Controllo password
  var isValid = checkPassword(password, savedHash, savedSalt, savedSaltPosition);

  if (!isValid) {
    return { errors: [{ field: 'password' }] };
  }

  // Accesso riuscito
  return HtmlService.createTemplateFromFile("home").evaluate();
}

// Funzione per controllare se la password è corretta
function checkPassword(password, savedHash, savedSalt, savedSaltPosition) {
  var algorithm = Utilities.DigestAlgorithm.SHA_256;
  var charset = Utilities.Charset.UTF_8;

  var part1 = password.substring(0, savedSaltPosition);
  var part2 = password.substring(savedSaltPosition);

  var saltedPassword = part1 + savedSalt + part2;

  var hash = Utilities.computeDigest(algorithm, saltedPassword, charset);
  var hexHash = toHex(hash);

  // Confronta l'hash della password inserita con l'hash salvato
  if (hexHash === savedHash) {
    return true;
  } else {
    return false;
  }
}
