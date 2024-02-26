function register(formData, register) {
  var ss = SpreadsheetApp.openById('1S6nn3A8M96TWePS3ah6eaZOy_gT8t0PiEO-AGLm_ato');
  var sheet = ss.getSheetByName('Users');

  var { hash: hashedPassword, salt, saltPosition } = encryptPassword(formData.password); // Cifra la password con il salt

  var currentDate = new Date();
  var formattedDate = Utilities.formatDate(currentDate, 'Europe/Rome', 'yyyy-MM-dd HH:mm:ss'); // Formatta la data e ora italiana

  var saltedPassword = formData.password.substring(0, saltPosition) + salt + formData.password.substring(saltPosition);


  var rowValues = [
    formData.email,
    formData.name,
    formData.surname,
    hashedPassword,
    salt,
    saltPosition,
    formattedDate
  ];

  if (register === true) {
    sheet.appendRow(rowValues);
  } else {
    return {
      rowValues: rowValues,
      passwordWithSalt: saltedPassword
    };
  }
}

function controlloInput(formData) {
  var errors = [];

  // Controllo campo email
  if (!isValidEmail(formData.email)) {
    errors.push("Inserisci un indirizzo email valido.");
  }

  // Controllo campo password
  if (!isValidPassword(formData.password)) {
    errors.push("La password deve contenere almeno 8 caratteri, includere almeno una lettera maiuscola, una lettera minuscola e un numero.");
  }

  // Controllo campo conferma password
  if (formData.password !== formData.confirm_password) {
    errors.push("Le password non corrispondono.");
  }

  // Controllo campo nome
  if (!isValidName(formData.nome)) {
    errors.push("Inserisci un nome valido.");
  }

  // Controllo campo cognome
  if (!isValidName(formData.cognome)) {
    errors.push("Inserisci un cognome valido.");
  }

  return errors;
}

function checkEmailExists(email) {
  var ss = SpreadsheetApp.openById('1S6nn3A8M96TWePS3ah6eaZOy_gT8t0PiEO-AGLm_ato');
  var sheet = ss.getSheetByName('Users');

  // Controlla se ci sono righe nel foglio
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false; // Non ci sono righe nel foglio, quindi l'email non esiste
  }

  // Controlla se l'email è già presente nel foglio
  var emailColumnValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues(); // Assume che l'email sia nella prima colonna (colonna A)
  var emailExists = emailColumnValues.flat().includes(email);

  return emailExists;
}

function sendConfirmationEmail(formData) {
  var nome = formData.name;
  var cognome = formData.surname;
  var email = formData.email;
  var dataRegistrazione = new Date().toLocaleString();

  var subject = 'Conferma registrazione';
  var body = 'Gentile ' + nome + ' ' + cognome + ',<br><br>Grazie per esserti registrato a HashingWizard. La tua registrazione è avvenuta con successo.<br><br>  registrazione: ' + dataRegistrazione + '.<br><br>Cordiali saluti.';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}
