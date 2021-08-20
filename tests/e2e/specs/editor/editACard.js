// https://docs.cypress.io/api/introduction/api.html
import pause from "../../plugins/pause"
import { inputs, differentInputs } from "../../plugins/inputs"
import chaiColors from 'chai-colors'
import * as fillOut from "./FillOut"

chai.use(chaiColors)



describe('Editor.vue', () => {
  it('Checks that the editor loads correctly', () => {
    cy.contains('Modify Card')
    pause()
  })
  it('Edits Personal Info Form', () => {
    fillOut.PersonalInfo(differentInputs, inputs)
  })
  it('Edits Doses', () => {
    fillOut.Doses(differentInputs.doses, inputs.doses)
  })
  it('Continues to preview', () => {
    cy.get('[style="z-index: 101;"] > .footer-ios > ion-toolbar.ion-no-margin > .ion-no-margin').click()
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/preview')
    })
  })
})
