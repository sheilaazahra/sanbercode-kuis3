
describe('Login OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  //TC-LOG-001
  it('Login dengan data valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  //TC-LOG-002
  it('Login dengan username salah', () => {
    cy.get('input[name="username"]').type('SalahUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  //TC-LOG-003
  it('Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  //TC-LOG-004
  it('Login dengan username dan password kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)

    cy.get('.oxd-input-field-error-message')
      .each(($error) => {
        cy.wrap($error).should('contain.text', 'Required')
      })
  })

  //TC-LOG-005
  it('Login dengan username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group')
      .eq(0)
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required')
  })

  //TC-LOG-006
  it('Login dengan password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group')
      .eq(1)
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required')
  })

// TC-LOG-007
it('Password ditampilkan dengan karakter tersembunyi (titik-titik)', () => {
  cy.get('input[name="password"]')
    .should('have.attr', 'type', 'password')
})


//TC-LOG-008
it('Halaman Forgot Password', () => {
  cy.contains('Forgot your password?').click()

  cy.url().should('include', '/requestPasswordResetCode')
})


// TC-LOG-009
it('Login dengan input SQL injection', () => {
  cy.get('input[name="username"]').type("' OR '1'='1")
  cy.get('input[name="password"]').type("' OR '1'='1")
  cy.get('button[type="submit"]').click()

  cy.contains('Invalid credentials').should('be.visible')
  cy.url().should('include', '/auth/login')
})


//TC-LOG-010
it('Login dengan klik tombol Enter', () => {
  cy.get('input[name="username"]').type('Admin')
  cy.get('input[name="password"]').type('admin123{enter}')

  cy.url().should('include', '/dashboard')
})


//TC-LOG-011
  it('Menampilkan button login', () => {
    cy.get('button[type="submit"]').should('be.visible')
  })


//TC-LOG-012
  it('Menampilkan placeholder username dan password', () => {
    cy.get('input[name="username"]')
      .should('have.attr', 'placeholder', 'Username')

    cy.get('input[name="password"]')
      .should('have.attr', 'placeholder', 'Password')
  })


})
