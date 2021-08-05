import { createAnimation } from "@ionic/vue"
import { Router } from 'vue-router'
import { matcher, TransitionTypes } from './transitions/Matcher'

const Transitions = {
  // 👇 Call this function in an `onMounted()` in Tabs.vue and pass an instance of `useRouter()` to it.
  HandleTransitions: (router: Router): void => {

    // Selects the actual <ion-router-outlet> that renders the tabs, which apparently isn't the one in App.vue.
    const routerOutlet = document.querySelector(
      "ion-router-outlet"
    ) as any;

    // Dynamically check what the transition for a page should be before the router navigates to it
    router.beforeEach((to, from, next) => {
      const
        // Whatever transitions you want are passed in the routes defined in router/index.ts
        enteringElTransition = to.meta.transition as RouterMetaTransitions, 
        leavingElTransition = from.meta.transition as RouterMetaTransitions,

        // Searches for the corresponding transition functions for the entering ang leaving pages
        enteringFunc = (() => { // this 👇 is equivalent to `matcher.leaving[to.meta.transition.leaving]`
          const transitionType = enteringElTransition.entering;
          return matcher.entering[transitionType as keyof TransitionTypes]
        })(),
        leavingFunc = (() => {
          const transitionType = leavingElTransition.leaving;
          return matcher.leaving[transitionType as keyof TransitionTypes]
        })(),

        // Checks if you'd like to disable the transition on the leaving/entering page
        showTransitionOnEnteringEl = leavingElTransition.showTransitionOnEnteringEl,
        showTransitionOnLeavingEl = enteringElTransition.showTransitionOnLeavingEl;

      // console.log(enteringFunc);
      // console.log(leavingFunc);

      // Dynamically create the transition function to be passed to the router outlet
      const transition = (baseEl: HTMLElement, opts: any): any => {
        const { enteringEl, leavingEl } = opts;

        // console.log(`showTransitionOnEnteringEl: ${showTransitionOnEnteringEl}`)
        // console.log(`showTransitionOnLeavingEl: ${showTransitionOnLeavingEl}`)

        return createAnimation()
          .addAnimation(enteringFunc(enteringEl, showTransitionOnEnteringEl !== false ? undefined : 0)) // if showTransitionOnEnteringEl is true or unset, use the default transition duration, otherwise set the duration to 0, essentially disabling it.
          .addAnimation(leavingFunc(leavingEl, showTransitionOnLeavingEl !== false ? undefined : 0))

      }

      // Pass the transition function to the routerOutlet
      routerOutlet.animation = transition

      // Navigate to the route
      next();
    });
  }
}


export default Transitions;

// Interfaces 

export interface RouterMetaTransitions {
  entering: string;
  leaving: string;
  showTransitionOnEnteringEl?: boolean;
  showTransitionOnLeavingEl?: boolean;
}
