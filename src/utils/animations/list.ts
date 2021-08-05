import { createAnimation } from "@ionic/vue";

export default {
  enter(el: HTMLElement, done: Function) {
    console.log("Called enter()")
    createAnimation()
      .addElement(el)
      .duration(175)
      .iterations(1)
      .fromTo("transform", "scale(0)", "scale(1)")
      .fromTo("opacity", "0", "1")
      .play().then(() => done());
  },
  leave(el: HTMLElement, done: Function) {
    console.log("Called leave()")
    createAnimation()
      .addElement(el)
      .duration(150)
      .fromTo("opacity", 1, 0)
      .fromTo("height", `${el.scrollHeight}px`, 0)
      .to("margin", 0)
      .to("padding", 0)
      .play().then(() => done());
  }
}