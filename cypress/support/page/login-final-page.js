
class LoginPage {
    elements = {
        username: () => cy.get('input[name="username"]'),
        password: () => cy.get('input[name="password"]'),
        loginButton: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('.oxd-alert-content-text'),
        requiredError: () => cy.get('.oxd-input-field-error-message'),
        forgotPassword: () => cy.get('.orangehrm-login-forgot-header'),
    };

    visit() {
        cy.visit('/web/index.php/auth/login');
    }

    visitDashboard() {
        cy.visit('/web/index.php/dashboard/index');
    }

    inputUsername(username) {
        this.elements.username().clear().type(username);
    }

    inputPassword(password) {
        this.elements.password().clear().type(password);
    }

    login(username, password) {
        if (username !== '') {
            this.inputUsername(username);
        }

        if (password !== '') {
            this.inputPassword(password);
        }

        this.elements.loginButton().click();
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    clickForgotPassword() {
        this.elements.forgotPassword().click();
    }

    // Assertions
    verifyLoginSuccess() {
        cy.url().should('include', '/dashboard');
    }

    verifyDashboard() {
        cy.url().should('include', '/dashboard');
    }

    verifyLoginFailed() {
        this.elements.errorMessage()
            .should('be.visible')
            .and('contain.text', 'Invalid credentials');
    }

    verifyErrorMessage(message) {
        this.elements.errorMessage()
            .should('be.visible')
            .and('contain', message);
    }

    verifyRequiredField() {
        this.elements.requiredError()
            .should('be.visible')
            .and('contain.text', 'Required');
    }

    verifyRequiredMessage() {
        this.elements.requiredError()
            .should('have.length', 2)
            .and('contain', 'Required');
    }

    verifyForgotPasswordPage() {
        cy.url().should('include', '/requestPasswordResetCode');
    }

    verifyRedirectToLogin() {
        cy.url().should('include', '/auth/login');
    }

    verifyLoginPage() {
        cy.url().should('include', '/auth/login');
    }
}

export default new LoginPage();
