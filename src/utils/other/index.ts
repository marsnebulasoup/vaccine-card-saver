// Random Utility Functions
import { Ref } from "vue";


// Adapted from https://stackoverflow.com/a/7224605/
export const capitalizeFirstLetter =
  (s: string) =>
    (s && s[0].toLocaleUpperCase() + s.slice(1)) || ""


export const DateUtils = {
  isDate: (date: string) => {
    const parsed = new Date(date)
    return (parsed.toString() !== "Invalid Date") && parsed
  },
  formatDate: (date: string) => {
    const parsed = DateUtils.isDate(date);
    return parsed ? parsed.toLocaleDateString() : "N/A"
  }
}

export const ScrollUtils = () => {
  const scrollIntoView = require('scroll-into-view');

  return {
    scrollInput: (ev: any, direction: "x" | "y", time = 300, callback?: Function) => {
      console.log("Scrolling");
      // if (!ev.target) return
      scrollIntoView(ev.target || ev, {
        time,
        align: {
          lockX: direction !== "x" && direction,
          lockY: direction !== "y" && direction,
        },
      }, callback);
    }
  }
}

export const InputValidators = (pattern: Ref, status: Ref<"normal" | "pass" | "fail">, emit: Function) => {
  return {
    validateInput: (input: string) => {
      console.log(input)
      if (!input.length) {
        emit("update:modelValue", input);
        status.value = "normal"
        return
      }
      if (pattern.value) {
        const matches = input.match(pattern.value) || [];
        if (matches.join("") === input) {
          emit("update:modelValue", input);
          status.value = "pass"
        } else status.value = "fail";
        return
      }
      emit("update:modelValue", input);
      status.value = "pass"
    }
  }
}