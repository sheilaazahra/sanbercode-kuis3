import loginPage from '../../support/page/login-final-page';
import loginData from '../../support/data/login-final-data';
import recruitmentPage from '../../support/page/rec-final-page';
import recruitmentData from '../../support/data/rec-final-data';

describe('Recruitment Module - OrangeHRM', () => {

    let candidate;

    beforeEach(() => {
        loginPage.visit();

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        loginPage.verifyDashboard();

        recruitmentPage.visit();

        candidate = {
            firstName: recruitmentData.firstName,
            middleName: recruitmentData.middleName,
            lastName: `${recruitmentData.lastName}${Date.now()}`,
            email: `${recruitmentData.emailPrefix}${Date.now()}@gmail.com`,
            contactNumber: recruitmentData.contactNumber,
        };
    });

    it('TC-REC-001 - User melihat halaman Recruitment', () => {
        recruitmentPage.verifyRecruitmentPage();
    });

    it('TC-REC-002 - User membuka form Add Candidate', () => {
        recruitmentPage.clickAddCandidate();

        recruitmentPage.verifyAddCandidatePage();
    });

    it('TC-REC-003 - Sistem menampilkan validasi ketika field wajib dikosongkan', () => {
        recruitmentPage.clickAddCandidate();
        recruitmentPage.clickSave();

        recruitmentPage.verifyCandidateFormRequired();
    });

    it('TC-REC-004 - User menambahkan kandidat dengan data valid', () => {
        recruitmentPage.addCandidate(candidate);

        recruitmentPage.verifyCandidateSaved();
    });

    it('TC-REC-005 - User mencari kandidat berdasarkan nama', () => {
        recruitmentPage.addCandidate(candidate);

        recruitmentPage.visit();

        recruitmentPage.searchCandidate(
            `${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`
        );

        recruitmentPage.verifyCandidateExists(
            `${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`
        );
    });

    it('TC-REC-006 - User melihat detail kandidat', () => {
        recruitmentPage.addCandidate(candidate);

        recruitmentPage.visit();

        const fullName =
            `${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`;

        recruitmentPage.searchCandidate(fullName);
        recruitmentPage.openCandidate(fullName);

        recruitmentPage.verifyCandidateDetails(candidate);
    });

    it('TC-REC-007 - User menghapus kandidat', () => {
        recruitmentPage.addCandidate(candidate);

        recruitmentPage.visit();

        const fullName =
            `${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`;

        recruitmentPage.searchCandidate(fullName);
        recruitmentPage.deleteCandidate(fullName);

        recruitmentPage.verifyCandidateDeleted(fullName);
    });

    it('TC-REC-008 - Sistem menolak resume dengan format file yang tidak didukung', () => {
        recruitmentPage.clickAddCandidate();

        recruitmentPage.fillCandidateForm(candidate);

        recruitmentPage.uploadResume(
            recruitmentData.invalidResume
        );

        recruitmentPage.clickSave();

        recruitmentPage.verifyInvalidResume();
    });

});