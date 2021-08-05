// 👇 Import your transitions here 
import Push from './Push'


// 👇 Match them with their corresponding function here 
// DON'T FORGET TO UPDATE THE `TransitionTypes` INTERFACE BELOW ALSO.
export const matcher: Matcher = {
  leaving: {
    "push-to-right": Push.rightLeaving,
    "push-to-left": Push.leftLeaving,
    "push-to-bottom": Push.bottomLeaving,
    "push-to-top": Push.topLeaving

  },
  entering: {
    "push-to-right": Push.rightEntering,
    "push-to-left": Push.leftEntering,
    "push-to-top": Push.topEntering,
    "push-to-bottom": Push.bottomEntering
  }
}

// Interfaces

export interface TransitionTypes {
  "push-to-right": Function;
  "push-to-left": Function;
  "push-to-bottom": Function;
  "push-to-top": Function;
}

export interface Matcher {
  leaving: TransitionTypes;
  entering: TransitionTypes;
}
