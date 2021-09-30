import { notify } from './../haptics/index';
import { Ref, ref, watch } from "vue";
import { ScrollUtils } from ".";
import { NotificationType } from '@capacitor/haptics';

const DEBUG = false;

const GenerateUniqueName = (name: string, errors: Ref<Errors>) => {
  let newName = name;
  while (Object.keys(errors.value).includes(newName)) {
    const id = Math.floor(Math.random() * 10000000000);
    newName = `${name} ${id}`
    DEBUG && console.error(`⚠ WARNING ⚠\n The name '${name}' is used for multiple fields and may screw up form validation, so it'll be changed to '${newName}'`)
  }
  return newName
}

const WatchErrorTooltip = (errors: Ref<Errors>, name: string, item: Ref) => {
  // For opening the error tooltip

  const { scrollInput } = ScrollUtils()

  const isValidatorErrorVisible = ref(false);
  const validatorErrorMsg = ref("");
  const validatorErrorEl = ref();
  watch(
    () => errors.value[name] && errors.value[name]["show"],
    (show) => {
      if (show) {
        DEBUG && console.log(item.value.$el)
        scrollInput(item.value.$el, "y", 300, () => {
          isValidatorErrorVisible.value = true;
          validatorErrorMsg.value = errors.value[name]["message"];
          validatorErrorEl.value = { target: item.value.$el };
        })
        errors.value[name]["show"] = false;
      }
    });
  return {
    isValidatorErrorVisible,
    validatorErrorMsg,
    validatorErrorEl
  }
}
export const ErrorHandlers = (errors: Ref<Errors>, name: string, item: Ref) => {
  DEBUG && console.log(`New ErrorHandler @ ${name}`)

  name = GenerateUniqueName(name, errors);

  return {
    addError: (msg: string | undefined) => {
      DEBUG && console.log(`Adding error to ${name}`)
      errors.value[name] = {
        exists: true,
        message: msg || `Error in '${name}'`,
        show: false
      }
    },
    removeError: () => {
      DEBUG && console.log(`Removing error from ${name}`)
      errors.value[name] = {
        exists: false,
        message: "",
        show: false
      };
    },
    deleteError: () => {
      DEBUG && console.log(`Deleting error from ${name}`)
      delete errors.value[name];
    },
    ...WatchErrorTooltip(errors, name, item)
  }
}

export const VerifyValidation = (errors: Ref<Errors>, callback: Function) => {
  DEBUG && console.log('Verifying validation...')
  for (const key in errors.value) {
    const error = errors.value[key]
    if (error.exists) {
      DEBUG && console.log('Validation failed, showing error')
      notify({ type: NotificationType.Error })
      error.show = true
      return
    }
  }
  DEBUG && console.log('Validation succeeded, calling callback()')
  notify({ type: NotificationType.Success })
  callback();
}

export interface Errors {
  [key: string]: {
    exists: boolean;
    message: string;
    show: boolean;
  };
}