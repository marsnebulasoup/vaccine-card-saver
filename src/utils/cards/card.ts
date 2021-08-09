import Brands from './brands';
import { capitalizeFirstLetter, DateUtils } from "@/utils/other"


export function FormatVaccineCard(card: Card) {
  let { id, lastName, firstName, middleInitial, dob, patientNumber, fullyVaccinated, doses } = card
  firstName = capitalizeFirstLetter(firstName).trim();
  lastName = capitalizeFirstLetter(lastName).trim();

  // Capitalizes and adds a period to the end of the first initial of the middle name
  // Note that this adds a space to the end so that if it is added to `name`, it will be formatted properly
  middleInitial = `${middleInitial.slice(0, 1)}${middleInitial.length ? '. ' : ''}`.toLocaleUpperCase();

  card = {
    id: id,
    lastName: lastName,
    firstName: firstName,
    middleInitial: middleInitial,
    name: `${firstName} ${middleInitial || ""}${lastName}`,
    dob: DateUtils.isDate(dob) ? dob : "N/A",
    dobFormatted: DateUtils.formatDate(dob),
    patientNumber: patientNumber || "N/A",
    fullyVaccinated: fullyVaccinated,
    doses: doses,
  }
  return card
}

export enum DoseNumbers {
  First = "1",
  Second = "2",
  Other = "Other"
}

export class VaccineDose {
  doseNumber: DoseNumbers;
  brand: string;
  date: string;
  lot: string;
  dateFormatted: string;
  administeredByOrAt: string;
  constructor(
    { doseNumber, brand, date, administeredByOrAt, lot }:
      { doseNumber: string; brand: string; date: string; administeredByOrAt: string; lot: string }
  ) {
    // TODO: 👉👉👉 the chip selector for dose numbers have fields "First", "Second", "Other", which are not in the type "1" | "2" | "Other" ...enums might be better for this?
    // also stress test this af
    this.doseNumber = Object.keys(DoseNumbers).includes(doseNumber) ? DoseNumbers[doseNumber as keyof typeof DoseNumbers] : DoseNumbers.Other;
    this.brand = this.processBrands(brand)

    const isDate = DateUtils.isDate(date);
    this.date = isDate ? isDate.toISOString() : "N/A";

    this.dateFormatted = DateUtils.formatDate(date)
    this.administeredByOrAt = administeredByOrAt;
    this.lot = lot || "N/A"
  }

  processBrands(brand: string) {
    const brands = new Brands();
    return brands.isBrand(brand) ? brand : "N/A"
  }

  get FormattedDose() {
    const dose: Dose = {
      doseNumber: this.doseNumber,
      brand: this.brand,
      date: this.date,
      dateFormatted: this.dateFormatted,
      administeredByOrAt: this.administeredByOrAt,
      lot: this.lot
    }
    return dose;
  }
}


// Interfaces
export interface Card {
  id: number; // TODO: figure out how to work with these ids
  lastName: string;
  firstName: string;
  middleInitial: string;
  name: string;
  dob: string;
  dobFormatted: string;
  patientNumber: string;
  fullyVaccinated: boolean;
  doses: Dose[];
}



export interface Dose {
  doseNumber: DoseNumbers; // Hardcoded for now since the design of the card would have to change to add more doses
  brand: string;
  date: string;
  dateFormatted: string;
  administeredByOrAt: string;
  lot: string;
}




// Sample Card
// {
//   name: "Joel K. Foster",
//   dob: "2021-07-31T17:01:25.051Z",
//   dobFormatted: "7/31/2021",
//   fullyVaccinated: false,
//   patientNumber: "2837529873894",
//   doses: [
//     {
//       doseNumber: "1",
//       brand: "Pfizer",
//       date: "",
//       dateFormatted: "5/12/21",
//       administeredByOrAt: "CVS9999",
//       lot: "KS2384",
//     },
//   ],
// };