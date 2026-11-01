
import loginPage from '../../support/page/login-final-page';
import loginData from '../../support/data/login-final-data';

describe('Login Module - OrangeHRM', () => {

    beforeEach(() => {
        loginPage.visit();
    });

    // TC-LOGIN-001: Login dengan data valid
    it('TC-LOGIN-001 - Login dengan data valid', () => {

        cy.intercept('POST', '**/auth/validate').as('loginRequest');

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response).to.exist;
        });

        loginPage.verifyDashboard();
    });

    // TC-LOGIN-002: Login dengan username dan password salah
    it('TC-LOGIN-002 - Login dengan username dan password salah', () => {

        loginPage.login(
            loginData.invalidUser.username,
            loginData.invalidUser.password
        );

        loginPage.verifyErrorMessage('Invalid credentials');
        loginPage.verifyLoginPage();
    });

    // TC-LOGIN-003: Login dengan field kosong
    it('TC-LOGIN-003 - Login dengan username dan password kosong', () => {

        loginPage.clickLogin();

        loginPage.verifyRequiredMessage();
        loginPage.verifyLoginPage();
    });

    // TC-LOGIN-004: Akses Dashboard tanpa login
    it('TC-LOGIN-004 - Mengakses Dashboard secara langsung tanpa login', () => {

        cy.clearCookies();
        cy.clearLocalStorage();

        loginPage.visitDashboard();

        loginPage.verifyLoginPage();
    });

    // TC-LOGIN-005: Mengakses halaman Forgot Password
    it('TC-LOGIN-005 - Mengakses halaman Forgot Password', () => {

        loginPage.clickForgotPassword();

        loginPage.verifyForgotPasswordPage();

        cy.contains('Reset Password')
            .should('be.visible');
    });

    // TC-LOGIN-006: Login dengan jaringan lambat
    it('TC-LOGIN-006 - Login dengan simulasi jaringan lambat', () => {

        cy.intercept('POST', '**/auth/validate', (req) => {
            req.continue((res) => {
                res.setDelay(3000);
            });
        }).as('slowLogin');

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        cy.wait('@slowLogin').then((interception) => {
            expect(interception.response).to.exist;
        });

        loginPage.verifyDashboard();
    });

    // TC-LOGIN-007: Login menggunakan SQL Injection
    it('TC-LOGIN-007 - Login menggunakan SQL Injection', () => {

        loginPage.login(
            loginData.sqlInjection.username,
            loginData.sqlInjection.password
        );

        loginPage.verifyLoginPage();

        loginPage.verifyErrorMessage('Invalid credentials');
    });

    // TC-LOGIN-008: Login menggunakan XSS
    it('TC-LOGIN-008 - Login menggunakan XSS', () => {

        cy.on('window:alert', (message) => {
            throw new Error(`XSS berhasil dieksekusi: ${message}`);
        });

        loginPage.login(
            loginData.xss.username,
            loginData.xss.password
        );

        loginPage.verifyLoginPage();

        loginPage.verifyErrorMessage('Invalid credentials');
    });

});
