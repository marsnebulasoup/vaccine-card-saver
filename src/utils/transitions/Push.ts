import { createAnimation } from "@ionic/vue"

const GLOBAL_DURATION = 280;

const Push = {
  // leftEdge <-- center 
  leftLeaving: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(0, 0)`, `translate(-100%, 0)`)
    .fromTo('opacity', 1, 0.01),

  // center <-- rightEdge
  leftEntering: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(100%, 0)`, `translate(0, 0)`)
    .fromTo('opacity', 0.01, 1),

  // center --> rightEdge
  rightLeaving: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(0, 0)`, `translate(100%, 0)`)
    .fromTo('opacity', 1, 0.01),

  // leftEdge --> center
  rightEntering: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(-100%, 0)`, `translate(0, 0)`)
    .fromTo('opacity', 0.01, 1),

  // center 
  //   ↑    /* moves toward the top from the bottom */
  // bottomEdge
  topEntering: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(0, 100%)`, `translate(0, 0)`)
    .fromTo('opacity', 0.01, 1),

  // topEdge 
  //   ↑
  // center
  topLeaving: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(0, 0)`, `translate(0, -100%)`)
    .fromTo('opacity', 1, 0.01),

  // topEdge 
  //   ↓   /* moves toward the bottom from the top */
  // center
  bottomEntering: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(0, -100%)`, `translate(0, 0)`)
    .fromTo('opacity', 0.01, 1),

  // center 
  //   ↓
  // bottomEdge
  bottomLeaving: (el: HTMLElement, duration: number = GLOBAL_DURATION) => createAnimation()
    .addElement(el)
    .duration(duration)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', `translate(0, 0)`, `translate(0, 100%)`)
    .fromTo('opacity', 1, 0.01),
};

export default Push;