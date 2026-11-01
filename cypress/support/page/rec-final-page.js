
class RecruitmentPage {
    elements = {
        recruitmentMenu: () => cy.contains('a', 'Recruitment'),
        pageTitle: () => cy.get('h5'),

        addButton: () => cy.contains('button', 'Add'),
        saveButton: () => cy.get('button[type="submit"]'),

        firstName: () => cy.get('input[name="firstName"]'),
        middleName: () => cy.get('input[name="middleName"]'),
        lastName: () => cy.get('input[name="lastName"]'),

        email: () => cy.contains('.oxd-input-group', 'Email').find('input'),
        contactNumber: () => cy.contains('.oxd-input-group', 'Contact Number').find('input'),

        resumeInput: () => cy.get('input[type="file"]'),

        candidateSearch: () => cy.contains('.oxd-input-group', 'Candidate Name').find('input'),
        searchButton: () => cy.contains('button', 'Search'),

        candidateRows: () => cy.get('.oxd-table-card'),
        toastMessage: () => cy.get('.oxd-toast'),
        requiredError: () => cy.get('.oxd-input-field-error-message'),
    };

    visit() {
        cy.visit('/web/index.php/recruitment/viewCandidates');
    }

    clickRecruitmentMenu() {
        this.elements.recruitmentMenu().click();
    }

    clickAddCandidate() {
        this.elements.addButton().click();
    }

    fillCandidateForm(candidate) {
        this.elements.firstName().clear().type(candidate.firstName);
        this.elements.middleName().clear().type(candidate.middleName);
        this.elements.lastName().clear().type(candidate.lastName);

        this.elements.email().clear().type(candidate.email);
        this.elements.contactNumber().clear().type(candidate.contactNumber);
    }

    uploadResume(filePath) {
        this.elements.resumeInput().selectFile(filePath, {
            force: true,
        });
    }

    clickSave() {
        this.elements.saveButton().click();
    }

    addCandidate(candidate) {
        this.clickAddCandidate();
        this.fillCandidateForm(candidate);
        this.clickSave();
    }

    searchCandidate(name) {
        this.elements.candidateSearch()
            .clear()
            .type(name);

        cy.get('.oxd-autocomplete-dropdown')
            .should('be.visible');

        cy.get('.oxd-autocomplete-option')
            .should('have.length.greaterThan', 0)
            .first()
            .click();

        this.elements.searchButton().click();
    }

  openCandidate(name) {
    cy.contains('.oxd-table-card', name)
        .should('be.visible')
        .find('i.bi-eye-fill')
        .click();

    cy.url().should('include', '/recruitment/addCandidate/');
}

    deleteCandidate(name) {
        cy.contains('.oxd-table-card', name)
            .should('be.visible')
            .find('button')
            .last()
            .click();

        cy.get('.oxd-button--label-danger')
            .should('be.visible')
            .click();
    }

    // Assertions

    verifyRecruitmentPage() {
        cy.url().should('include', '/recruitment/viewCandidates');
        cy.contains('h5', 'Candidates').should('be.visible');
    }

    verifyAddCandidatePage() {
        cy.contains('h6', 'Add Candidate').should('be.visible');
    }

    verifyCandidateFormRequired() {
        this.elements.requiredError()
            .should('have.length.greaterThan', 0)
            .and('contain', 'Required');
    }

    verifyCandidateSaved() {
        this.elements.toastMessage()
            .should('be.visible')
            .and('contain.text', 'Successfully Saved');
    }

    verifyCandidateExists(name) {
        cy.contains('.oxd-table-card', name)
            .should('be.visible');
    }

    verifyCandidateDetails(candidate) {
        cy.url().should('include', '/recruitment/addCandidate/');

        this.elements.firstName()
            .should('have.value', candidate.firstName);

        this.elements.middleName()
            .should('have.value', candidate.middleName);

        this.elements.lastName()
            .should('have.value', candidate.lastName);

        this.elements.email()
            .should('have.value', candidate.email);

        this.elements.contactNumber()
            .should('have.value', candidate.contactNumber);
    }

    verifyCandidateDeleted(name) {
        cy.contains('.oxd-table-card', name)
            .should('not.exist');
    }

    verifyInvalidResume() {
        cy.contains(/file type|file format|invalid/i)
            .should('be.visible');
    }
}

export default new RecruitmentPage();
