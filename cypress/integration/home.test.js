// const cypress = require("cypress")

describe("home componenbt", ()=>{

  it('should display a list of courses', ()=>{
      cy.fixture('./../fixtures/courses.json').as("coursesJson")
      // cy.fixture('courses.json').as("coursesJson");
      cy.server()

      //cy.route is deprecated now cy.intercept working
      cy.intercept('/api/courses').as('courses')
      cy.visit("/")
      cy.contains("All Courses")
      // cy.wait(5000)
      cy.wait('@courses');
      // cy.get("mat-card", { timeout: 10000 }).should("have.length", "9");
      cy.get("mat-card").should("have.length", "9");
      // cy.get("mat-card", { timeout: 10000 }).should("be.visible").should("have.length", 9);
      // cy.get("mat-card").should("have.length", 9);
      // cy.get(".mdc-tab", { timeout: 10000 }).should("have.length", 9);
      // cy.visit('/')

  })
})
