function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Funzione di validazione per l'email
function isValidEmail(email) {
  // Utilizza una regular expression per verificare il formato dell'email
  var emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  return emailPattern.test(email);
}

// Funzione di validazione per la password
function isValidPassword(password) {
  // La password deve contenere almeno 8 caratteri, includere almeno una lettera maiuscola, una lettera minuscola e un numero
  var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordPattern.test(password);
}

// Funzione di validazione per il nome e cognome
function isValidName(name) {
  // Utilizza una regular expression per verificare che il nome/cognome contenga solo lettere e spazi
  var namePattern = /^[A-Za-z\s]+$/;
  return namePattern.test(name);
}
