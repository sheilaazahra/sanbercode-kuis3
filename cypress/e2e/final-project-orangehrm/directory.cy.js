import loginPage from '../../support/page/login-final-page';
import loginData from '../../support/data/login-final-data';
import directoryPage from '../../support/page/direc-final-page';
import directoryData from '../../support/data/direc-final-data';

describe('Directory Module - OrangeHRM', () => {

    beforeEach(() => {
        loginPage.visit();

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        loginPage.verifyDashboard();

        directoryPage.visit();
    });

    it('TC-DIR-001 - User melihat halaman Directory', () => {
        directoryPage.verifyDirectoryPage();
        directoryPage.verifyEmployeeResults();
    });

    it('TC-DIR-002 - User mencari karyawan berdasarkan nama', () => {
        directoryPage.searchByEmployeeName(
            directoryData.employeeSearch
        );

        directoryPage.verifyEmployeeResults();
        directoryPage.verifyEmployeeName(
            directoryData.employeeName
        );
    });

    it('TC-DIR-003 - User mencari karyawan berdasarkan Job Title', () => {
        directoryPage.searchByJobTitle(
            directoryData.jobTitle
        );

        directoryPage.verifyEmployeeResults();
    });

    it('TC-DIR-004 - User mencari karyawan berdasarkan Location', () => {
        directoryPage.searchByLocation(
            directoryData.location
        );

        directoryPage.verifyEmployeeResults();
    });

    it('TC-DIR-005 - User mencari karyawan menggunakan kombinasi filter', () => {
        directoryPage.searchCombined(
            directoryData.employeeSearch,
            directoryData.jobTitle,
            directoryData.location
        );

        directoryPage.verifyEmployeeResults();
        directoryPage.verifyEmployeeName(
            directoryData.employeeName
        );
    });

    it('TC-DIR-006 - User melihat detail karyawan dengan memilih kartu karyawan', () => {
        directoryPage.openEmployeeDetails(
            directoryData.employeeName
        );

        directoryPage.verifyEmployeeDetails(
            directoryData.employeeName,
            directoryData.jobTitle,
            directoryData.location
        );
    });

    it('TC-DIR-007 - User melihat informasi Work Email karyawan', () => {
        directoryPage.openEmployeeDetails(
            directoryData.employeeName
        );

        directoryPage.verifyEmployeeEmail(
            directoryData.workEmail
        );
    });

    it('TC-DIR-008 - User melihat informasi Work Telephone karyawan', () => {
        directoryPage.openEmployeeDetails(
            directoryData.employeeName
        );

        directoryPage.verifyEmployeeTelephone(
            directoryData.workTelephone
        );
    });

});