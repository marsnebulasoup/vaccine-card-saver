import pause from "../../plugins/pause"
import colors from "../../plugins/colors"

export const selectDate = (selector) => {
  cy.get(selector).click({ force: true })
  pause()
  cy.get(':nth-child(2) > .picker-button').click({ force: true })
}

export const ValidatorIcon = (selector, shouldBe = "pass") => {
  let colorToMatch
  if (shouldBe === "normal") colorToMatch = colors.primary
  else if (shouldBe === "pass") colorToMatch = colors.success
  else colorToMatch = colors.danger // fail
  cy.get(selector)
    .closest('ion-item')
    .find("div[data-is-an-icon]")
    // .next("div[data-is-an-icon]")
    .should('have.css', 'background-color')
    .and('be.colored', colorToMatch)
  pause()
}

export const FieldInput = (selector, input, oldInput = undefined) => {
  // checks for oldInput
  // if oldInput exists, 
  //  check if it is filled in the input,
  //  and validator icon is green,
  //  then erases input
  // check if validator icon is blue
  // types input
  // checks if validator icon is green
  // erases input
  // check if validator icon is blue
  // types "/" (which will fail all inputs)
  // checks validator icon to be red
  // erases input
  // check if validator icon is blue
  // types input
  // checks validator icon to be green

  if (oldInput) {
    cy.get(selector).should('have.value', oldInput)
    ValidatorIcon(selector, "pass")
    cy.get(selector).type('{selectall}{backspace}', { force: true })
  }

  ValidatorIcon(selector, "normal")

  cy.get(selector).type(input, { force: true })
  ValidatorIcon(selector, "pass")

  cy.get(selector).type('{selectall}{backspace}', { force: true })
  ValidatorIcon(selector, "normal")


  ValidatorIcon(selector, "normal")
  cy.get(selector).type('/', { force: true })
  ValidatorIcon(selector, "fail")

  cy.get(selector).type('{selectall}{backspace}', { force: true })
  ValidatorIcon(selector, "normal")

  cy.get(selector).type(input, { force: true })
  ValidatorIcon(selector, "pass")
}

export const DateInput = (selector, oldInput = false) => {
  if (oldInput) ValidatorIcon(selector, "pass")
  else ValidatorIcon(selector, "normal")

  selectDate(selector)
  ValidatorIcon(selector, "pass")
}

export const CheckboxInput = (selector, oldInput = false) => {
  if (oldInput) {
    cy.get(selector)
      .should('have.class', 'checkbox-checked')
  }
  else {
    cy.get(selector)
      .should('not.have.class', 'checkbox-checked')
      .click()

    ValidatorIcon(selector, "pass")
  }
}