class LoginPage {
  elements = {
    username: () => cy.get('input[name="username"]'),
    password: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    errorMessage: () =>
      cy.get('.oxd-alert-content-text'),
    requiredError: () =>
      cy.get('.oxd-input-field-error-message'),
    forgotPassword: () =>
      cy.get('.orangehrm-login-forgot-header'),
  };

  visit() {
    cy.visit('/auth/login');
  }

  login(username, password) {
    if (username !== '') {
      this.elements.username().type(username);
    }

    if (password !== '') {
      this.elements.password().type(password);
    }

    this.elements.loginButton().click();
  }

  clickForgotPassword() {
    this.elements.forgotPassword().click();
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard');
  }

  verifyLoginFailed() {
    this.elements.errorMessage()
      .should('have.text', 'Invalid credentials');
  }

  verifyRequiredField() {
    this.elements.requiredError()
      .should('be.visible')
      .and('contain.text', 'Required');
  }

  verifyForgotPasswordPage() {
    cy.url().should('include', '/requestPasswordResetCode');
  }

  verifyRedirectToLogin() {
    cy.url().should('include', '/auth/login');
  }
}

export default new LoginPage();