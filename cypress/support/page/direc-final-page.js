class DirectoryPage {
    elements = {
        directoryMenu: () => cy.contains('a', 'Directory'),
        pageTitle: () => cy.contains('h6', 'Directory'),

        employeeName: () => cy.get('input[placeholder="Type for hints..."]'),
        jobTitle: () => cy.get('.oxd-select-text').eq(0),
        location: () => cy.get('.oxd-select-text').eq(1),

        searchButton: () => cy.get('button[type="submit"]'),
        resetButton: () => cy.get('button[type="reset"]'),

        employeeCards: () => cy.get('.orangehrm-directory-card'),
    };

    visit() {
        cy.visit('/web/index.php/directory/viewDirectory');
    }

    clickDirectoryMenu() {
        this.elements.directoryMenu().click();
    }

    selectEmployeeName(name) {
        this.elements.employeeName().clear().type(name);

        cy.get('.oxd-autocomplete-dropdown')
            .should('be.visible');

        cy.get('.oxd-autocomplete-option')
            .should('have.length.greaterThan', 0)
            .first()
            .click();
    }

    selectJobTitle(jobTitle) {
        this.elements.jobTitle().click();

        cy.get('.oxd-select-dropdown')
            .contains(jobTitle)
            .click();
    }

    selectLocation(location) {
        this.elements.location().click();

        cy.get('.oxd-select-dropdown')
            .contains(location)
            .click();
    }

    searchByEmployeeName(name) {
        this.selectEmployeeName(name);
        this.elements.searchButton().click();
    }

    searchByJobTitle(jobTitle) {
        this.selectJobTitle(jobTitle);
        this.elements.searchButton().click();
    }

    searchByLocation(location) {
        this.selectLocation(location);
        this.elements.searchButton().click();
    }

    searchCombined(name, jobTitle, location) {
        this.selectEmployeeName(name);
        this.selectJobTitle(jobTitle);
        this.selectLocation(location);

        this.elements.searchButton().click();
    }

    clickEmployeeCard(name) {
        cy.contains('.orangehrm-directory-card', name)
            .should('be.visible')
            .click();
    }

    openEmployeeDetails(name) {
        this.searchByEmployeeName(name);
        this.clickEmployeeCard(name);
    }

    // Assertions

    verifyDirectoryPage() {
        cy.url().should('include', '/directory/viewDirectory');
        this.elements.pageTitle().should('be.visible');
    }

    verifyEmployeeResults() {
        this.elements.employeeCards()
            .should('have.length.greaterThan', 0);
    }

    verifyEmployeeName(name) {
        cy.contains('.orangehrm-directory-card', name)
            .should('be.visible');
    }

    verifyEmployeeDetails(name, jobTitle, location) {
        cy.contains(name).should('be.visible');
        cy.contains(jobTitle).should('be.visible');
        cy.contains(location).should('be.visible');
    }

    verifyEmployeeEmail(email) {
        cy.contains(email).should('be.visible');
    }

    verifyEmployeeTelephone(telephone) {
        cy.contains(telephone).should('be.visible');
    }
}

export default new DirectoryPage();