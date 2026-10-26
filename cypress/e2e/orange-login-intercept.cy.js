const loginUrl =
  "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

const dashboardUrl =
  "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";

describe("OrangeHRM Login - Intercept", () => {

// TC-LOG-001
  it("TC-LOG-001 - Login dengan data valid", () => {
    cy.intercept("GET", "**/api/v2/dashboard/employees/action-summary").as(
      "validLoginDashboard",
    );

    cy.visit(loginUrl);
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.wait("@validLoginDashboard")
      .its("response.statusCode")
      .should("eq", 200);

    cy.url().should("include", "/dashboard/index");
  });

// TC-LOG-002
  it("TC-LOG-002 - Login dengan password salah", () => {
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "wrongPasswordRequest",
    );

    cy.visit(loginUrl);
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("salah123");
    cy.get('button[type="submit"]').click();

    cy.wait("@wrongPasswordRequest")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");

    cy.url().should("include", "/auth/login");
  });

// TC-LOG-003
  it("TC-LOG-003 - Login dengan data tidak valid", () => {
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "invalidCredentialsRequest",
    );

    cy.visit(loginUrl);
    cy.get('[name="username"]').type("user_salah");
    cy.get('[name="password"]').type("password_salah");
    cy.get('button[type="submit"]').click();

    cy.wait("@invalidCredentialsRequest")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");

    cy.url().should("include", "/auth/login");
  });

//TC-LOG-004
  it("TC-LOG-004 - Login dengan username kosong", () => {
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "emptyUsernameRequest",
    );

    cy.visit(loginUrl);
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.get('[name="username"]')
      .parent()
      .parent()
      .find(".oxd-input-field-error-message")
      .should("contain", "Required");

    cy.get("@emptyUsernameRequest.all").should("have.length", 0);
  });

//TC-LOG-005
  it("TC-LOG-005 - Login dengan password kosong", () => {
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "emptyPasswordRequest",
    );

    cy.visit(loginUrl);
    cy.get('[name="username"]').type("Admin");
    cy.get('button[type="submit"]').click();

    cy.get('[name="password"]')
      .parent()
      .parent()
      .find(".oxd-input-field-error-message")
      .should("contain", "Required");

    cy.get("@emptyPasswordRequest.all").should("have.length", 0);
  });

//TC-LOG-006
  it("TC-LOG-006 - Membuka halaman Request Reset Password", () => {
    cy.visit(loginUrl);

    cy.intercept("GET", "**/web/index.php/core/i18n/messages").as(
      "resetPageMessages",
    );

    cy.contains("Forgot your password?").click();

    cy.wait("@resetPageMessages");

    cy.url().should("include", "/auth/requestPasswordResetCode");

    cy.get('[name="username"]').should("be.visible");
  });

 //TC-LOG-007
  it("TC-LOG-007 - Login dengan input SQL injection", () => {
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "sqlInjectionRequest",
    );

    cy.visit(loginUrl);

    cy.get('[name="username"]').type("' OR '1'='1");
    cy.get('[name="password"]').type("' OR '1'='1");
    cy.get('button[type="submit"]').click();

    cy.wait("@sqlInjectionRequest");

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");

    cy.url().should("include", "/auth/login");
  });

//TC-LOG-008
  it("TC-LOG-008 - Mengakses halaman Dashboard tanpa login", () => {
    cy.intercept("GET", "**/api/v2/dashboard/**").as(
      "unauthorizedDashboardRequest",
    );

    cy.visit(dashboardUrl);

    cy.url().should("include", "/auth/login");
    cy.get('[name="username"]').should("be.visible");

    cy.get("@unauthorizedDashboardRequest.all").should("have.length", 0);
  });
});
