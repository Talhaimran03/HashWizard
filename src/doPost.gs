function doPost(e) {

  if (e.parameter.submit == "login") {
    // Effettua l'accesso
    var res = login(e.parameter);

    if (res.hasOwnProperty("errors")) {
      // Se ci sono errori durante l'accesso, visualizza la pagina di login con gli errori
      var template = HtmlService.createTemplateFromFile('login');
      template.loginErrors = res.errors;
      return template.evaluate();
    } else {
      // Accesso riuscito, salva l'informazione di sessione nello script
      var template = HtmlService.createTemplateFromFile('home');
      template.sessionUser = e.parameter.email;
      return template.evaluate();
    }

  } else if (e.parameter.submit == "register") {
    // Registrazione
    var inputErrors = controlloInput(e.parameter);

    if (inputErrors.length > 0) {
      // Errori nel form
      var template = HtmlService.createTemplateFromFile('register');
      template.errors = inputErrors;
      var evaluatedTemplate = template.evaluate();
      evaluatedTemplate.getContent = function() {
        return evaluatedTemplate.getContent();
      };
      return evaluatedTemplate;
    } else {

      // Non ci sono errori, controlla se l'email è già registrata
      var emailExists = checkEmailExists(e.parameter.email);

      if (emailExists) {
        var template = HtmlService.createTemplateFromFile('register');
        template.errors = { email: "L'email specificata è già registrata." };
        return template.evaluate()
      } else {
        // Registrazione
        register(e.parameter, true);
        
        // Email di conferma
        sendConfirmationEmail(e.parameter);

        // Registrazione avvenuta con successo, reindirizza all'accesso
        var template = HtmlService.createTemplateFromFile('login');
        template.registrationSuccess = true;
        var evaluatedTemplate = template.evaluate();
        evaluatedTemplate.getContent = function() {
          return evaluatedTemplate.getContent();
        };
        return evaluatedTemplate;

      }
    }
  
  
  } else if (e.parameter.submit == "demonstration") {
    var result = register(e.parameter, false);
    var rowValues = result.rowValues;
    var saltedPassword = result.passwordWithSalt;
    
    var hashedPassword = rowValues[3];
    var salt = rowValues[4];
    
    var template = HtmlService.createTemplateFromFile('home');
    template.originalPassword = e.parameter.password;
    template.hashedPassword = hashedPassword;
    template.salt = salt;
    template.saltedPassword = saltedPassword;
    return template.evaluate();
  }

  return HtmlService.createTemplateFromFile("index").evaluate();

}

