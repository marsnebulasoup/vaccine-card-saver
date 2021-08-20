const PAUSE = false

const pause = () => {
  PAUSE && cy.pause()
}


export default pause