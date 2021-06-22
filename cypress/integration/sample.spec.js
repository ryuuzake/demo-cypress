/// <reference types="cypress" />

describe('My First Test', () => {

  beforeEach(() => {
    cy.fixture('example.json').as('user');
  });

  it('visit the testing page', () => {
    cy.visit('https://demoqa.com/');
  });

  it('visit the practice form section', () => {

    // Click to 'Practice Form'
    cy.contains('Forms').click();
    cy.contains('Practice Form').click();

    // Assert URL
    cy.url().should('include', 'automation-practice-form');
  })

  it('has a title', () => {
    cy.contains('Student Registration Form');
  });

  it('fills the form from fixtures', function () {

    // Fill Data with Type
    cy.get('input[id=firstName]').type(this.user.firstName);
    cy.get('input[id=lastName]').type(this.user.lastName);
    cy.get('input[id=userEmail]').type(this.user.userEmail);

    // Fill Data with Check
    cy.get('input[name=gender][type=radio]')
      .check(this.user.gender, { force: true });

    cy.get('input[id=userNumber]').type(this.user.userNumber);

    // Weird Quirk from Testing Website
    cy.get('input[id=dateOfBirthInput]')
      .type(`{selectall}${this.user.dob}`);

    // Fill Multiple Type / Type with Enter
    const subjectsInput = cy.get('input[id=subjectsInput]');
    this.user.subjects.map((s) => {
      subjectsInput.type(`${s}{enter}`, { force: true });
    });

    // Fill Checkbox with different value from Text Shown
    let hobbiesLabels = {};

    cy.get('#hobbiesWrapper label.custom-control-label')
      .each((e) => {

        cy.get(`#${e.attr("for")}`)
          .invoke('val')
          .then((val) => hobbiesLabels[e.text()] = val);

      }).then(() => {

        this.user.hobbies.map((h) => {
          cy.get('input[type=checkbox]')
            .check(hobbiesLabels[h], { force: true });
        });

      });

    cy.get('textarea[id=currentAddress]').type(this.user.address);

    cy.get('input[id=react-select-3-input]')
      .type(`${this.user.state}{enter}`, { force: true });

    cy.get('input[id=react-select-4-input]')
      .type(`${this.user.city}{enter}`, { force: true });

    // Submit Data
    cy.get('button[type=submit]').click();

    // Close Modal
    cy.get('button[id=closeLargeModal]').click({ force: true });
  });

});