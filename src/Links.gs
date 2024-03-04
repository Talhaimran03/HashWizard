function doGet(p) {
  var page = p.parameter.page;
  var htmlOutput;

  if (page === 'login') {
    htmlOutput = HtmlService.createTemplateFromFile('login').evaluate();
  } else if (page === 'register') {
    htmlOutput = HtmlService.createTemplateFromFile('register').evaluate();
  } else if (page === 'logout') {
    htmlOutput = HtmlService.createTemplateFromFile('login');
    htmlOutput.sessionUser = undefined;
    return htmlOutput.evaluate();
  }  else {
    htmlOutput = HtmlService.createTemplateFromFile('index').evaluate();
  }

  return htmlOutput;
}
