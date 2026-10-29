
import loginPage from '../../support/page/login-page';
import loginData from '../../support/data/login-data';

describe('OrangeHRM Login - Automation with POM', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-LOG-001 - Login dengan data valid', () => {
    loginPage.login(
      loginData.valid.username,
      loginData.valid.password
    );

    loginPage.verifyLoginSuccess();
  });

  it('TC-LOG-002 - Login dengan password salah', () => {
    loginPage.login(
      loginData.wrongPassword.username,
      loginData.wrongPassword.password
    );

    loginPage.verifyLoginFailed();
  });

  it('TC-LOG-003 - Login dengan username dan password tidak valid', () => {
    loginPage.login(
      loginData.invalid.username,
      loginData.invalid.password
    );

    loginPage.verifyLoginFailed();
  });

  it('TC-LOG-004 - Login dengan username kosong', () => {
    loginPage.login('', loginData.valid.password);

    loginPage.verifyRequiredField();;
  });

  it('TC-LOG-005 - Login dengan password kosong', () => {
    loginPage.login(loginData.valid.username, '');

    loginPage.verifyRequiredField();
  });

  it('TC-LOG-006 - Membuka halaman reset password', () => {
    loginPage.clickForgotPassword();

    loginPage.verifyForgotPasswordPage();
  });

  it('TC-LOG-007 - Login menggunakan input SQL injection', () => {
    loginPage.login(
      loginData.sqlInjection.username,
      loginData.sqlInjection.password
    );

    loginPage.verifyLoginFailed();
  });

  it('TC-LOG-008 - Mengakses dashboard tanpa login', () => {
    cy.visit('/dashboard/index');

    loginPage.verifyRedirectToLogin();
  });
});
