import pause from "../../plugins/pause"

describe("Home.vue - Viewer Mode", () => {
  it('Opens viewer mode', () => {
    // cy.visit('/')
    cy.contains('Your Cards')
    cy.get('#homepage')
      .find('[data-vaccine-card-id]')
      .then(cards => {
        pause()
        for (const card of cards) {
          card.click()
          pause()
          cy.get('#homepage')
            .find('.exit-viewer-mode-icon')
            .should('be.visible')
          cy.get('#homepage')
            .find('.tools-icon')
            .should('be.visible')
            .click()
          cy.get('.fab-list-side-start > .ion-color')
            .click()
        }
      })

  })
})