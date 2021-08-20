import { inputs } from "../../plugins/inputs"
import pause from "../../plugins/pause"
import { Preview } from "./preview"

describe('Preview.vue', () => {
  it('Checks if preview loaded properly', () => {
    cy.contains('Does this look right?')
    pause()
  })
  it('Checks if the vaccine card loaded properly', () => {
    Preview(inputs)
  })
  it('Saves the vaccine card', () => {
    cy.get(':nth-child(2) > ion-toolbar.ion-no-margin > .ion-no-margin')
      .click()

    cy.location((location) => {
      expect(location.pathName).to.eq('home')
    })
  })
})