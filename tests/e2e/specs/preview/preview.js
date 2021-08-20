const InvertedDoseNumbers = {
  "First": "1",
  "Second": "2",
  "Other": "Other"
}


export const Preview = (inputs) => {
  cy.get('[data-vaccine-card-id]').as('VaccineCard')
  cy.get('@VaccineCard').find('.wrappable-title > .ion-color').as('Name')
  cy.get('@VaccineCard').find('.text-end > :nth-child(1) > .small-text').as('DateOfBirth')
  cy.get('@VaccineCard').find('.text-end > :nth-child(2) > .small-text').as('PatientNumber')
  cy.get('@VaccineCard').find(':nth-child(1) > :nth-child(1) > .ion-color-medium > .caption-text').as('FullyVaccinated')

  cy.get('@Name')
    .should('contain', inputs.firstName)
    .and('contain', inputs.lastName)
    .and('contain', inputs.middleInitial)

  cy.get('@DateOfBirth')
    .should('not.be.empty')

  cy.get('@PatientNumber')
    .should('contain', inputs.patientNumber)

  cy.get('@FullyVaccinated')
    .should(`${inputs.fullyVaccinated ? 'not.' : ''}contain`, 'Not Fully Vaccinated')

  // Dose Numbers
  cy.get('@VaccineCard')
    .find('[data-is-vaccine-dose] > .card-content-ios > .ion-inherit-color > .dose-number')
    .should((doseNumbers) => {
      //                  👇 probably should be doseNumbers.length here but this gets around an annoying bug where .find() returns double the elements it's supposed to for some reason
      for (let i = 0; i < inputs.length; i++) {
        const expected = InvertedDoseNumbers[inputs.doses[i].doseNumber]
        expect(doseNumbers[i]).to.have.text(expected)
      }
    })
    .wait(500)

  // Brand
  cy.get('@VaccineCard')
    .find('[data-is-vaccine-dose] > .card-content-ios > .ion-inherit-color > .vaccine-name')
    .should((brandNames) => {
      //                  👇 probably should be brandNames.length here but this gets around an annoying bug where .find() returns double the elements it's supposed to for some reason
      for (let i = 0; i < inputs.length; i++) {
        const expected = inputs.doses[i].brand
        expect(brandNames[i]).to.have.text(expected)
      }
    })

  // Date
  cy.get('@VaccineCard')
    .find('[data-is-vaccine-dose] > .card-content-ios > .personal-info > :nth-child(1) > :nth-child(1) > .small-text')
    .should('not.be.empty')

  // Lot
  cy.get('@VaccineCard')
    .find('[data-is-vaccine-dose] > .card-content-ios > .personal-info > .text-end > :nth-child(1) > .small-text')
    .should((lots) => {
      //                  👇 probably should be lots.length here but this gets around an annoying bug where .find() returns double the elements it's supposed to for some reason
      for (let i = 0; i < inputs.length; i++) {
        const expected = inputs.doses[i].lot
        expect(lots[i]).to.have.text(expected)
      }
    })

  // Administered by/at 
  cy.get('@VaccineCard')
    .find('[data-is-vaccine-dose] > .card-content-ios > .personal-info > :nth-child(1) > :nth-child(2) > .small-text')
    .should((clinicSites) => {
      //                  👇 probably should be clinicSites.length here but this gets around an annoying bug where .find() returns double the elements it's supposed to for some reason
      for (let i = 0; i < inputs.length; i++) {
        const expected = inputs.doses[i].administeredByOrAt
        expect(clinicSites[i]).to.have.text(expected)
      }
    })
}