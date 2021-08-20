import * as validate from "./Validator"
import pause from "../../plugins/pause"

export const PersonalInfo = (inputs, oldInputs = undefined) => {
  cy.get(':nth-child(1) > ion-col.md > .item > .input-container > .input').as('LastName')
  cy.get('.ion-no-padding.ion-no-margin > :nth-child(2) > :nth-child(1) > .item > .input-container > .input').as('FirstName')
  cy.get(':nth-child(2) > .item > .input-container > .input').as('MiddleInitial')
  cy.get(':nth-child(3) > ion-col.md > .item > .input-container').as('DateOfBirth')
  cy.get(':nth-child(4) > ion-col.md > .item > .input-container > .input').as('PatientNumber')
  cy.get('.checkbox-container > .ion-color-success').as('FullyVaccinated')

  validate.FieldInput('@LastName', inputs.lastName, oldInputs && oldInputs.lastName)
  validate.FieldInput('@FirstName', inputs.firstName, oldInputs && oldInputs.firstName)
  validate.FieldInput('@MiddleInitial', inputs.middleInitial, oldInputs && oldInputs.middleInitial)
  validate.DateInput('@DateOfBirth', oldInputs)
  validate.FieldInput('@PatientNumber', inputs.patientNumber, oldInputs && oldInputs.patientNumber)
  if (inputs.fullyVaccinated) validate.CheckboxInput('@FullyVaccinated', oldInputs && oldInputs.fullyVaccinated)
}

export const Doses = (doses, oldDoses = undefined) => {
  cy.contains('ion-card', 'Add A Dose').as('AddADose')

  if (oldDoses) { // unselect the currently selected dose numbers otherwise it'll cause problems with validation, because there's a chance that the new dose numbers may be disabled 
    for (let i = 0; i < oldDoses.length; i++) {
      const doseCard = `ion-card:nth-child(${i + 1}) > .card-content-ios`
      cy.get(doseCard)
        .contains('ion-chip', oldDoses[i].doseNumber)
        .click({ force: true })
    }
  }

  for (let i = 0; i < doses.length; i++) {
    oldDoses || cy.get('@AddADose').click().wait(500)

    const dose = doses[i];
    const oldDose = oldDoses && (i < oldDoses.length && oldDoses[i]);

    const doseCard = `ion-card:nth-child(${i + 1}) > .card-content-ios`

    // Dose Number
    cy.get(doseCard)
      .contains('ion-chip', dose.doseNumber)
      .click({ force: true })
    pause()

    // Brand
    cy.get(doseCard)
      .contains('ion-chip', dose.brand)
      .click({ force: true })
    pause()

    // Lot Number
    cy.get(doseCard + '> :nth-child(8) > .input-container > .input').as('LotNumber')
    validate.FieldInput('@LotNumber', dose.lot, oldDose && oldDose.lot)

    // Date
    cy.get(doseCard + '> .item-interactive > .input-container').as('Date')
    validate.DateInput('@Date', oldDose)

    // Healthcare professional or clinic site
    cy.get(doseCard + '> :nth-child(14) > .input-container > .input').as('AdministeredByOrAt')
    validate.FieldInput('@AdministeredByOrAt', dose.administeredByOrAt, oldDose && oldDose.administeredByOrAt)
  }
}