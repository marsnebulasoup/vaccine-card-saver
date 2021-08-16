import { Ref, ref } from "vue";
import { Dose, VaccineDose } from "../cards/card";

export enum DoseNumbers {
  First = "1",
  Second = "2",
  Other = "Other"
}

// export const InvertedDoseNumbers = {
//   [`${DoseNumbers.First}`]: "First",
//   [`${DoseNumbers.Second}`]: "Second",
//   [`${DoseNumbers.Other}`]: "Other"
// }

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

export const generateDoseId = (doses: VaccineDose[]): number => {
  const DEBUG = true;
  const ids = doses.map(dose => dose.id);
  let id = 0;
  while (!id || ids.includes(id)) {
    id = Math.floor(Math.random() * 10000000000);
    console.warn(`⚠ WARNING ⚠\n The ID '${id}' is used for multiple DOSES, so it'll be changed to '${id}'`)
  }
  return id
}

export const FormatDosesForEditing = (doses: Dose[]) => {
  const DEBUG = false
  DEBUG && console.log("DOSE -> ", doses.slice(0))
  const formatted: VaccineDose[] = []
  doses.forEach((dose: any, index) => {
    if (dose.doseNumber === "N/A") dose.doseNumber = ""
    if (dose.brand === "N/A") dose.brand = ""
    if (dose.date === "N/A") dose.date = ""
    if (dose.dateFormatted === "N/A") dose.dateFormatted = ""
    if (dose.lot === "N/A") dose.lot = ""
    if (dose.administeredByOrAt === "N/A") dose.administeredByOrAt = ""

    formatted.push(new VaccineDose(dose))
  })
  return formatted
}

export const CreateNewDoseNumberArrayForChipSelector = () => {
  const doseNumbers = ref<DoseNumberForChipSelector[]>(
    Object.entries(DoseNumbersInfo).map(([key, { value }]) => {
      return {
        name: key,
        value: value,
        disabled: false,
      };
    })
  );
  return doseNumbers
}

export const UpdateDisabledDoseNumbers = (doses: VaccineDose[], doseNumbers: Ref<DoseNumberForChipSelector[]>) => {
  const DEBUG = false;

  const selectedDoseNumbers = doses.map((dose) => dose.doseNumber);
  DEBUG && console.log("Selected Dose Numbers -> ", selectedDoseNumbers);

  for (const doseNumberType in DoseNumbersInfo) {
    const doseNumberTypeValue = DoseNumbersInfo[doseNumberType].value;
    DEBUG && console.log("\nCurrent doseNumberType -> ", doseNumberType);
    DEBUG && console.log("Current doseNumberTypeValue -> ", doseNumberTypeValue);

    const amtOfDoseNumberType = selectedDoseNumbers.filter(
      (d) => d === doseNumberTypeValue
    ).length;
    DEBUG && console.log("amtOfDoseNumberType -> ", amtOfDoseNumberType);

    const maxAmtOfDoseNumberType =
      DoseNumbersInfo[doseNumberType].numberOfTimesThisCanBeRepeated;
    DEBUG && console.log("maxAmtOfDoseNumberType -> ", maxAmtOfDoseNumberType);

    const disableDoseType =
      amtOfDoseNumberType === maxAmtOfDoseNumberType || false;
    DEBUG && console.log("disabledDoseType -> ", disableDoseType);

    doseNumbers.value = doseNumbers.value.map((d) => {
      if (d.value === doseNumberTypeValue) d.disabled = disableDoseType;
      return d;
    });
  }
}



interface DoseNumberForChipSelector {
  name: string;
  value: string;
  disabled: boolean;
}