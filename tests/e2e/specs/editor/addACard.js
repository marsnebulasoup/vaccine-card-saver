// https://docs.cypress.io/api/introduction/api.html
import pause from "../../plugins/pause"
import {inputs} from "../../plugins/inputs"
import chaiColors from 'chai-colors'
import * as fillOut from "./FillOut"

chai.use(chaiColors)



describe('Editor.vue', () => {
  it('Checks that the editor loads correctly', () => {
    cy.visit('/editor')
    cy.contains('Add a Card')

    pause()
  })
  it('Fills out Personal Info Form', () => {
    fillOut.PersonalInfo(inputs)
  })
  it('Adds Doses', () => {
    fillOut.Doses(inputs.doses)
  })
  it('Continues to preview', () => {
    cy.get('ion-toolbar.ion-no-margin > .ion-no-margin')
      .click()
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/preview')
    })
  })
})
