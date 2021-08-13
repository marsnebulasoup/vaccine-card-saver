import { Ref, ref } from "vue";
import { Dose, VaccineDose } from "../cards/card";

export enum DoseNumbers {
  First = "1",
  Second = "2",
  Other = "Other"
}

export const InvertedDoseNumbers = {
  [`${DoseNumbers.First}`]: "First",
  [`${DoseNumbers.Second}`]: "Second",
  [`${DoseNumbers.Other}`]: "Other"
}

export const DoseNumbersInfo: {
  [key: string]: {
    value: DoseNumbers;
    numberOfTimesThisCanBeRepeated: number;
  };
} = {
  "First": {
    value: DoseNumbers.First,
    numberOfTimesThisCanBeRepeated: 1
  },
  "Second": {
    value: DoseNumbers.Second,
    numberOfTimesThisCanBeRepeated: 1
  },
  "Other": {
    value: DoseNumbers.Other,
    numberOfTimesThisCanBeRepeated: 2
  },
}

export const FormatDosesForEditing = (doses: Dose[]) => {
  const formatted: { id: number; dose: VaccineDose }[] = []
  doses.forEach((dose: any, index) => {
    dose.doseNumber = InvertedDoseNumbers[dose.doseNumber]
    formatted.push({
      id: index,
      dose: new VaccineDose(dose)
    })
  })
  return formatted
}

export const CreateNewDoseNumberArrayForChipSelector = () => {
  const doseNumbers = ref<DoseNumberForChipSelector[]>(
    Object.keys(DoseNumbersInfo).map((key) => {
      return {
        value: key,
        disabled: false,
      };
    })
  );
  return doseNumbers
}

export const ManageDisabledDoseNumbers = (doses: { id: number; dose: VaccineDose }[], doseNumbers: Ref<DoseNumberForChipSelector[]>) => {
  const DEBUG = false;

  const selectedDoseNumbers = doses.map((dose) => dose.dose.doseNumber);
  DEBUG && console.log("Selected Dose Numbers -> ", selectedDoseNumbers);

  for (const doseNumberType in DoseNumbersInfo) {
    const doseNumberTypeValue = DoseNumbersInfo[doseNumberType].value;
    DEBUG && console.log("\nCurrent doseNumberType -> ", doseNumberType);
    DEBUG && console.log("Current doseNumberTypeValue -> ", doseNumberTypeValue);

    const amtOfDoseNumberType = selectedDoseNumbers.filter(
      (d) => d === doseNumberType
    ).length;
    DEBUG && console.log("amtOfDoseNumberType -> ", amtOfDoseNumberType);

    const maxAmtOfDoseNumberType =
      DoseNumbersInfo[doseNumberType].numberOfTimesThisCanBeRepeated;
    DEBUG && console.log("maxAmtOfDoseNumberType -> ", maxAmtOfDoseNumberType);

    const disableDoseType =
      amtOfDoseNumberType === maxAmtOfDoseNumberType || false;
    DEBUG && console.log("disabledDoseType -> ", disableDoseType);

    doseNumbers.value = doseNumbers.value.map((d) => {
      if (d.value === doseNumberType) d.disabled = disableDoseType;
      return d;
    });
  }
}



interface DoseNumberForChipSelector {
  value: string;
  disabled: boolean;
}