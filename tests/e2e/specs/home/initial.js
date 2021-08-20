// https://docs.cypress.io/api/introduction/api.html
import pause from "../../plugins/pause"


describe('Home.vue', () => {
  it('Checks that home loads correctly', () => {
    cy.visit('/')
    cy.contains('Your Cards')
    cy.contains("Looks like you don't have any cards saved.")
  })

  it('Checks that the "add a card" button/fab work properly', () => {
    const checkIfAtEditor = () => {
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/editor')
      })
      
      pause()
    }

    cy.get('.card-content-ios > .ion-color').as('addOneNowBtn')
    cy.get('.fab-horizontal-end > .ios').as('addOneFab')

    pause()
    
    cy.get('@addOneNowBtn').click()
    checkIfAtEditor()

    cy.visit('/')
    pause()

    cy.get('@addOneFab').click()
    checkIfAtEditor()
  })
})
